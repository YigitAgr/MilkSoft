import React, { useState, useEffect } from 'react';
import './Layout.css';
import DashBoardAdmin from "../HomePageContent/DashBoardAdmin.jsx";
import HomePageContentUser from "../HomePageContent/DashBoardUser.jsx";
import FarmsContent from "../Farms/FarmsContent.jsx";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [token, setToken] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [selectedKey, setSelectedKey] = useState('1'); // Default selected key
    const [currentPage, setCurrentPage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedDecodedToken = localStorage.getItem("decodedToken");
        if (storedDecodedToken) {
            const decodedToken = JSON.parse(storedDecodedToken);
            console.log('Decoded token from local storage:', decodedToken);
            // Extract user roles from decoded token and set them
            setUserRoles(decodedToken.roles);
        }
    }, []);

    const handleMenuClick = (key) => {
        setSelectedKey(key);
        if (key === '1') {
            setCurrentPage('HomePageContentUser');
        } else if (key === 'admin1') {
            setCurrentPage('DashBoardAdmin');
        } else if (key === 'admin2') {
            setCurrentPage('FarmsContent');
        }
        // Add more conditions here if you have other pages
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'HomePageContentUser':
                return <HomePageContentUser />;
            case 'DashBoardAdmin':
                return <DashBoardAdmin />;
            case 'FarmsContent':
                return <FarmsContent />;
            // Add more cases if you have other pages to render
            default:
                if(userRoles.includes('ADMIN')) {
                    return <DashBoardAdmin />;
                } else {
                    return <HomePageContentUser />;}
        }
    };

    const handleLogout = () => {
        // Clear token from local storage and redirect to login page
        localStorage.removeItem("decodedToken");
        navigate('/'); // Redirect to login page
    };

    return (
        <Layout style={{ height: '100vh', width: '100vw', border: 'none', background: '#F0F8EA' }}>
            <Sider trigger={null}
                   collapsible collapsed={collapsed}
                   style={{ backgroundColor: "#7E5920", paddingTop: '150px' }}>
                <div className="demo-logo-vertical" />
                <Menu
                    style={{ backgroundColor: "#7E5920", height: '100%' }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedKey]} // Manage selected key state
                    onClick={({ key }) => handleMenuClick(key)} // Handle click event
                >
                    {userRoles.includes('USER') && (
                        <>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === '1' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='1'
                                icon={<UserOutlined />}
                            >
                                Dashboard
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === '2' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='2'
                                icon={<VideoCameraOutlined />}
                            >
                                My Farm
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === '3' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='3'
                                icon={<UploadOutlined />}
                            >
                                Cows
                            </Menu.Item>
                        </>
                    )}
                    {userRoles.includes('ADMIN') && (
                        <>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin1' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin1'
                                icon={<UserOutlined />}
                            >
                                Dashboard
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin2' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin2'
                                icon={<VideoCameraOutlined />}
                            >
                                Farms
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin3' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin3'
                                icon={<UploadOutlined />}
                            >
                                Supplies
                            </Menu.Item>
                        </>
                    )}
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        style={{ position: 'absolute', bottom: 0, width: '100%' }}
                        onClick={handleLogout}
                    >
                        Log Out
                    </Menu.Item>
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
                {renderContent()}
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
