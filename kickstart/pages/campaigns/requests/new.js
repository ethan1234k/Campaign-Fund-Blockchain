import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/layout';

const NewRequest = ( query ) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    return (
        <Layout>
            <h3>Create a Request</h3>
            <Form>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Amount in Ether</label>
                    <Input 
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        value={recipient}
                        onChange={(e) => {
                            setRecipient(e.target.value);
                        }}
                    />
                </Form.Field>

                <Button primary>Create</Button>
            </Form>
        </Layout>
    )
}

NewRequest.getInitialProps = async (props) => {
    return props.query;
};

export default NewRequest;
