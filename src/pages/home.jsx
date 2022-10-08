import React from "react";
import 'antd/dist/antd.min.css';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, PageHeader, Tag } from 'antd';

import ContentHome from '../components/contentHome';
//import Footer from '../components/footer';

function Home( ) {
    return (
        <body>
          <div>
            <ContentHome></ContentHome>
          </div>
        </body>
    );
}

export default Home;