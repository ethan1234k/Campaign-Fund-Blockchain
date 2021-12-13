import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xdc75F71CCc620c0f3BA64861A4873016150B0791'
);

export default factory;