import React from 'react';
import web3 from '../../ethereum/web3';
import { Card, Grid } from 'semantic-ui-react';
import Layout from "../../components/layout";
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';

const show = (campaign) => {
    console.log(campaign);

    const renderCards = () => {
        const items = [
            {
                header: campaign.manager,
                meta: 'Address of the Campaign Manager',
                description: "The manager at this address created this campaign, and can make spending requests.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: campaign.minimumContribution,
                meta: 'Minimum Contribution (Wei)',
                description: "The minimum amount of wei you must contribute to be an approver.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: campaign.requestsCount,
                meta: 'Number of Requests',
                description: "The amount of requests under this contract. Requests must be approved by approvers",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: campaign.approversCount,
                meta: 'Number of Approvers',
                description: "The number of contributers who have donated to this campaign.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(campaign.balance, 'ether'),
                meta: 'Campaign Balance (Ether)',
                description: "The amount of ether that this campaign has to spend on requests.",
                style: { overflowWrap: 'break-word' }
            }
        ]

        return <Card.Group items={items}/>
    }

    return (
        <Layout>
            <h3>Campaign</h3>
            <Grid>
                <Grid.Column width={10}>
                    <div>{renderCards()}</div>
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm address={campaign.address}/>
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

show.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);

    const campaignSummary = await campaign.methods.getSummary().call();

    return {
        address : props.query.address,
        minimumContribution : campaignSummary[0],
        balance : campaignSummary[1],
        requestsCount : campaignSummary[2],
        approversCount : campaignSummary[3],
        manager : campaignSummary[4]
    };
};

export default show;
