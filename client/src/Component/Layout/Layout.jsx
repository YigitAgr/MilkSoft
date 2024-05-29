import React, { useState, useEffect } from 'react';
import './Layout.css';
import DashBoardAdmin from "../HomePageContent/DashBoardAdmin.jsx";
import HomePageContentUser from "../HomePageContent/DashBoardUser.jsx";
import MyAssociation from "../MyAssociation/MyAssociation.jsx";
import AssociationUser from "../MyAssociation/AssociationUser.jsx";
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    HomeOutlined,
    ContactsOutlined,
    BankOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const LayoutPage = ({ children }) => { // Notice the children prop here
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
        }
    };

    const renderContent = () => {
        if (children) {
            return children; // Render the children if they exist
        }
        switch (currentPage) {
            case 'HomePageContentUser':
                return <HomePageContentUser />;
            case 'DashBoardAdmin':
                return <DashBoardAdmin />;
            case 'MyAssociation':
                return <MyAssociation />;
            case 'AssociationUser':
                return <AssociationUser />;
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
                                icon={<HomeOutlined />}
                            >
                                <Link to="/home">Dashboard</Link>
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
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'user1' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='user1'
                                icon={<UserOutlined />}
                            >
                                <Link to="/associationuser">Association</Link>
                            </Menu.Item>
                        </>
                    )}
                    {userRoles.includes('ADMIN') && (
                        <>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin1' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin1'
                                icon={<HomeOutlined style={{fontSize:'24px'}} />}
                            >
                                <Link to="/home">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin4' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin4'
                                icon={<BankOutlined  style={{fontSize:'24px'}}/>}
                            >
                                <Link to="/myassociation">My Association</Link>
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin2' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin2'
                                icon={<ContactsOutlined style={{fontSize:'24px'}} />}
                            >
                                <Link to="/farms">Farms</Link>
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin3' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin3'
                                icon={<UploadOutlined  style={{fontSize:'24px'}}/>}
                            >
                                Supplies
                            </Menu.Item>
                        </>
                    )}
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined  style={{fontSize:'24px'}}/>}
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
                <Content className="white-scrollbar" style={{ overflowY: 'auto' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;