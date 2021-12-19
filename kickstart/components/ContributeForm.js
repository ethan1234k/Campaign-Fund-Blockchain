import React, { useState } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props) => {
    const [amount, setAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const contributeToForm = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setErrorMessage("")

        const campaign = Campaign(props.address);

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(amount, 'ether')
            })
            Router.replaceRoute(`/campaigns/${props.address}`)
        } catch (e) {
            setErrorMessage(e.message);
        }

        setIsLoading(false);
        setAmount("");
    }

    return (
        <Form onSubmit={contributeToForm} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input 
                    label="ether"
                    labelPosition="right"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }}
                />
            </Form.Field>
            <Message 
                error={"true"}
                header={"Oops!"}
                content={errorMessage}
            />
            <Button primary loading={isLoading}>
                Contribute
            </Button>
        </Form>
    )
}

export default ContributeForm
