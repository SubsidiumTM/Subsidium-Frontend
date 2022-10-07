import React from "react";
import 'antd/dist/antd.min.css';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, PageHeader, Tag } from 'antd';

import ContentHome from '../components/contentHome';

function Home( ) {

    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                  1st menu item
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                  2nd menu item
                </a>
              ),
            },
            {
              key: '3',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                  3rd menu item
                </a>
              ),
            },
          ]}
        />
    );

    const DropdownMenu = () => (
        <Dropdown key="more" overlay={menu} placement="bottomRight">
        <Button
            type="text"
            icon={
            <MoreOutlined
                style={{
                fontSize: 20,
                }}
            />
            }
        />
        </Dropdown>
    );

    const routes = [
        {
            path: 'index',
            breadcrumbName: 'Home',
        },
        {
            path: 'first',
            breadcrumbName: 'News',
        },
        {
            path: 'second',
            breadcrumbName: 'Inventory',
        },
    ];

    return (
        <div>
            <PageHeader
            title="Hola"
            className="site-page-header"
            subTitle="Manuel Camacho"
            tags={<Tag color="blue">Running</Tag>}
            extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">Primary</Button>,
                <DropdownMenu key="more" />,
            ]}
            avatar={{src: 'https://avatars.githubusercontent.com/u/60832329?v=4',}}
            breadcrumb={{routes,}}>
        </PageHeader>
        <ContentHome></ContentHome>
        </div>
    );
}

export default Home;