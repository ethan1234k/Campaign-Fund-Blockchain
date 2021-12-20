import React from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import { Link } from '../../../routes';

const ViewRequests = ( query ) => {
    return (
        <Layout>
            <h3>Requests List</h3>
            <Link route={`/campaigns/${query.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
        </Layout>
    )
}

ViewRequests.getInitialProps = async (props) => {
    return props.query;
};

export default ViewRequests;
