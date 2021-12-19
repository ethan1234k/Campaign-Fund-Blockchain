import React, { useState } from 'react';
import Layout from "../../components/layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

const CreateCampaign = () => {
    const [minContribution, setMinContribution] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const createCampaignSubmission = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setErrorMessage("");
        try {
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(minContribution).send({
                from: accounts[0],
            });

            Router.pushRoute('/')
        } catch (e) {
            setErrorMessage(e.message);
        }
        setIsLoading(false);
    }

    return (
        <Layout>
            <h1>Create a new campaign!</h1>
            <Form onSubmit={createCampaignSubmission} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label={"wei"} 
                        labelPosition={"right"}
                        value={minContribution}
                        onChange={(e) => {
                            setMinContribution(e.target.value)
                        }}
                    />
                </Form.Field>
                <Message 
                    error={"true"}
                    header={"Oops!"}
                    content={errorMessage}
                />
                <Button primary={true} loading={isLoading}>Create</Button>
            </Form>

        </Layout>
    )
}

export default CreateCampaign;
