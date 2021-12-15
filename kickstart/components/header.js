import React from 'react'
import { Menu, MenuMenu } from 'semantic-ui-react';

const header = () => {
    return (
        <Menu style={{ marginTop: '3%'}}>
            <Menu.Item>
                CrowdCoin
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default header;
