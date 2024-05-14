import React,{useState} from 'react';
import './Layout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Row, Col, Avatar} from 'antd';

const {Header, Content, Sider}= Layout;


    const LayoutPage = () => {
        const [collapsed, setCollapsed] = useState(false);
        const {
            token: {colorBgContainer, borderRadiusLG},
        } = theme.useToken();

        const [selectedKey, setSelectedKey] = useState(null);

        return (

            <Layout style={{height: '100vh', width: '100vw', border: 'none', background: '#F0F8EA'}}>
                <Sider trigger={null}
                       collapsible collapsed={collapsed}
                       style={{backgroundColor: "#7E5920", paddingTop: '150px'}}>
                    <div className="demo-logo-vertical"/>
                    <Menu
                        style={{backgroundColor: "#7E5920"}}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item
                            style={{ color: 'white' }}
                            key='1'
                            icon={<UserOutlined/>}
                            className={`custom-selected-item ${selectedKey === '1' ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedKey('1');
                                setTimeout(() => setSelectedKey(null), 300);
                            }}
                        >
                            nav 1
                        </Menu.Item>
                        <Menu.Item
                            style={{ color: 'white' }}
                            key='2'
                            icon={<VideoCameraOutlined />}
                            className={`custom-selected-item ${selectedKey === '2' ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedKey('2');
                                setTimeout(() => setSelectedKey(null), 300);
                            }}
                        >
                            nav 2
                        </Menu.Item>
                        <Menu.Item
                            style={{ color: 'white' }}
                            key='3'
                            icon={<UploadOutlined />}
                            className={`custom-selected-item ${selectedKey === '3' ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedKey('3');
                                setTimeout(() => setSelectedKey(null), 300);
                            }}
                        >
                            nav 3
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{border: 'none'}}>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div style={{float: 'right', marginRight: '40px'}}>
                            <Avatar icon={<UserOutlined style={{color: 'black'}}/>}
                                    style={{backgroundColor: '#DBC4A4'}}/>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>

        );
    };
export default LayoutPage;