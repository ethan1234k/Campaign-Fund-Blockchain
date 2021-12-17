import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xd9bd7A000EE3702e49c0792F51B66B5AacdBCfc3'
);

export default factory;