import React from 'react'
import { Menu, MenuMenu } from 'semantic-ui-react';
import { Link } from '../routes';

const header = () => {
    return (
        <Menu style={{ marginTop: '3%'}}>
            <Link route={'/'}>
                <a className="item">CrowdCoin</a>
            </Link>
            <Menu.Menu position="right">
                <Link route={'/'}>
                    <a className="item">Campaigns</a>
                </Link>
                <Link route={'/campaigns/new'}>
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default header;
