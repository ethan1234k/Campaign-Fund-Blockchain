import React from 'react';
import Layout from "../../components/layout";
import Campaign from '../../ethereum/campaign';

const show = () => {
    return (
        <Layout>
            <h3>Show a campaign</h3>
        </Layout>
    )
}

show.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);

    const campaignSummary = await campaign.methods.getSummary().call();
    console.log(campaignSummary)
    return {};
};

export default show;
