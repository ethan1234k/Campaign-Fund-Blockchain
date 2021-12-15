import React, { useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/layout";

const newcampaign = ({ campaigns }) => {
  console.log("campaigns", campaigns);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button
          content={"Create New Campaign"}
          icon={"add circle"}
          primary={true}
          floated={"right"}
        />
        <div>{renderCampaigns()}</div>
      </div>
    </Layout>
  );
};

newcampaign.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default newcampaign;
