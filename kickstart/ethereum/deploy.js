// Attempting to deploy from account 0x424dDD135add7eD4249197ef890D789b7eBD9379
// Contract deployed to 0xdc75F71CCc620c0f3BA64861A4873016150B0791

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "excess update slim gasp corn fade claim comfort blind hamster vapor ticket",
  "https://rinkeby.infura.io/v3/dcbe2531293b49ab8f8da154b8af2005"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
