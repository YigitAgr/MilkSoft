import React, { useState, useEffect } from 'react';
import './Layout.css';
import DashBoardAdmin from "../HomePageContent/DashBoardAdmin.jsx";
import HomePageContentUser from "../HomePageContent/DashBoardUser.jsx";
import MyAssociation from "../MyAssociation/MyAssociation.jsx";
import AssociationUser from "../MyAssociation/AssociationUser.jsx";
import MyFarmUser from "../Farms/MyFarmUser.jsx";
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
import { Layout, Menu, Button, Avatar, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import MilkSoftLogo from '../../assets/MilkSoft.svg'; // Adjust the path to where your logo is located

const { Header, Content, Sider } = Layout;

const LayoutPage = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [selectedKey, setSelectedKey] = useState('1');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedDecodedToken = localStorage.getItem("decodedToken");
        if (storedDecodedToken) {
            const decodedToken = JSON.parse(storedDecodedToken);
            console.log('Decoded token from local storage:', decodedToken);
            setUserRoles(decodedToken.roles);
        }
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        switch (currentPath) {
            case '/home':
                setSelectedKey('1');
                break;
            case '/myfarm':
                setSelectedKey('2');
                break;
            case '/mycows':
                setSelectedKey('3');
                break;
            case '/associationuser':
                setSelectedKey('user1');
                break;
            case '/myassociation':
                setSelectedKey('admin4');
                break;
            case '/farms':
                setSelectedKey('admin2');
                break;
            default:
                setSelectedKey('1');
                break;
        }
    }, [location.pathname]);

    const handleMenuClick = async ({ key }) => {
        setSelectedKey(key);
        setLoading(true);
        switch (key) {
            case '1':
                navigate('/home');
                break;
            case '2':
                navigate('/myfarm');
                break;
            case 'user1':
                navigate('/associationuser');
                break;
            case '3':
                navigate('/mycows');
                break;
            case 'admin4':
                navigate('/myassociation');
                break;
            case 'admin2':
                navigate('/farms');
                break;
            default:
                navigate('/home');
                break;
        }
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("decodedToken");
        navigate('/');
    };

    const renderContent = () => {
        if (loading) {
            return <Spin size="large" />;
        }

        if (children) {
            return children;
        }

        if (userRoles.includes('ADMIN')) {
            return <DashBoardAdmin />;
        } else {
            return <HomePageContentUser />;
        }
    };

    const toggleSider = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ height: '100vh', width: '100vw', border: 'none', background: '#F0F8EA' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ backgroundColor: "#7E5920", paddingTop: '20px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src={MilkSoftLogo} alt="MilkSoft Logo" style={{ width: '80%', maxWidth: '200px' }} />
                </div>
                <Menu
                    style={{ backgroundColor: "#7E5920", height: '100%' }}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                >
                    {userRoles.includes('USER') && (
                        <>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === '1' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='1'
                                icon={<HomeOutlined />}
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
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'user1' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='user1'
                                icon={<UserOutlined />}
                            >
                                Association
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
                                Dashboard
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin4' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin4'
                                icon={<BankOutlined style={{fontSize:'24px'}} />}
                            >
                                My Association
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin2' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin2'
                                icon={<ContactsOutlined style={{fontSize:'24px'}} />}
                            >
                                Farms
                            </Menu.Item>
                            <Menu.Item
                                className={`custom-selected-item ${selectedKey === 'admin3' ? 'selected' : ''}`}
                                style={{ color: 'white' }}
                                key='admin3'
                                icon={<UploadOutlined style={{fontSize:'24px'}} />}
                            >
                                Supplies
                            </Menu.Item>
                        </>
                    )}
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined style={{fontSize:'24px'}} />}
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
                        background: '#FFFFFF',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleSider}
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
