import React, { useEffect } from "react";
import factory from "../ethereum/factory";

const newcampaign = ({ campaigns }) => {
  console.log("campaigns", campaigns);

  return <h1>{campaigns[0]}</h1>;
};

newcampaign.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default newcampaign;
