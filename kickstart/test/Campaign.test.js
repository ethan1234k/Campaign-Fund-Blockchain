const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' })

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    })

    const deployedAdresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = deployedAdresses[0];

    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it ("Factory and Campaign Deployed", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it ("Correctly Marks Manager", async () => {
        const manager = await campaign.methods.manager().call();
        assert.strictEqual(manager, accounts[0]);
    });

    it ("Allows Contributions, Marks Donor as Contributor", async () => {
        await campaign.methods.contribute().send({
            value: '300',
            from: accounts[1]
        })
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it ("Campaign Has Minimum Contribution", async () => {
        try {
            await campaign.methods.contribute().send({
                value: '50',
                from: accounts[2]
            })
            assert(false);
        } catch (e) {
            assert(e);
        }
    });

    it ("Manager Can Make Payment Request", async () => {
        await campaign.methods
            .createRequest('Buy Crypto', '100', accounts[5])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        const request = await campaign.methods.requests(0).call();
        assert.strictEqual('Buy Crypto', request.description);
    })

    it ("Processes Request", async () => {
        let initialBalance = await web3.eth.getBalance(accounts[2]);
        initialBalance = web3.utils.fromWei(initialBalance, 'ether');
        initialBalance = parseFloat(initialBalance);

        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        })

        await campaign.methods
            .createRequest('Buy Crypto', web3.utils.toWei('5', 'ether') , accounts[2])
            .send({
                from: accounts[0],
                gas: '1000000'
            })

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        let finalBalance = await web3.eth.getBalance(accounts[2]);
        finalBalance = web3.utils.fromWei(finalBalance, 'ether');
        finalBalance = parseFloat(finalBalance);
        assert(finalBalance > (initialBalance + 2));
    })
})