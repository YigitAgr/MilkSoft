import React, { useState, useEffect } from 'react';
import './Layout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Row, Col, Avatar } from 'antd';

const { Header, Content, Sider } = Layout;

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [token, setToken] = useState('');
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        const storedDecodedToken = localStorage.getItem("decodedToken");
        if (storedDecodedToken) {
            const decodedToken = JSON.parse(storedDecodedToken);
            console.log('Decoded token from local storage:', decodedToken);
            // Extract user roles from decoded token and set them
            setUserRoles(decodedToken.roles);
        }
    }, []);

    return (
        <Layout style={{ height: '100vh', width: '100vw', border: 'none', background: '#F0F8EA' }}>
            <Sider trigger={null}
                   collapsible collapsed={collapsed}
                   style={{ backgroundColor: "#7E5920", paddingTop: '150px' }}>
                <div className="demo-logo-vertical" />
                <Menu
                    style={{ backgroundColor: "#7E5920" }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    {userRoles.includes('USER') && (
                        <>
                            <Menu.Item
                                style={{ color: 'white' }}
                                key='1'
                                icon={<UserOutlined />}
                            >
                                nav 1
                            </Menu.Item>
                            <Menu.Item
                                style={{ color: 'white' }}
                                key='2'
                                icon={<VideoCameraOutlined />}
                            >
                                nav 2
                            </Menu.Item>
                            <Menu.Item
                                style={{ color: 'white' }}
                                key='3'
                                icon={<UploadOutlined />}
                            >
                                nav 3
                            </Menu.Item>
                        </>
                    )}
                    {userRoles.includes('ADMIN') && (
                        <>
                            <Menu.Item
                                style={{ color: 'white' }}
                                key='admin1'
                                icon={<UserOutlined />}
                            >
                                nav admin 1
                            </Menu.Item>
                            <Menu.Item
                                style={{ color: 'white' }}
                                key='admin2'
                                icon={<VideoCameraOutlined />}
                            >
                                nav admin 2
                            </Menu.Item>
                            <Menu.Item
                                style={{ color: 'white' }}
                                key='admin3'
                                icon={<UploadOutlined />}
                            >
                                nav admin 3
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Sider>
            <Layout style={{ border: 'none' }}>
                <Header
                    style={{
                        padding: 0,
                        background: '#FFFFFF', // You can customize the background color
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ float: 'right', marginRight: '40px' }}>
                        <Avatar icon={<UserOutlined style={{ color: 'black' }} />}
                                style={{ backgroundColor: '#DBC4A4' }} />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#FFFFFF', // You can customize the background color
                        borderRadius: '20px', // You can customize the border radius
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
