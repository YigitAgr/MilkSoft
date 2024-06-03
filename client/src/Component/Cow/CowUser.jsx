import React, { useState, useEffect } from "react";
import { Card, Layout, Button, notification } from "antd";
import axios from 'axios';
import CreateCowModal from '../Modals/CreateCowModal.jsx';

const { Content } = Layout;

const CowUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [farmId, setFarmId] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const fetchFarmId = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                const farmerResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { farmerId } = farmerResponse.data;

                // Now use the farmerId to get the farmId
                const farmResponse = await axios.get(`http://localhost:8080/api/farm/getFarmId/${farmerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const fetchedFarmId = farmResponse.data;
                setFarmId(fetchedFarmId);
            } catch (e) {
                console.error('Failed to fetch data: ', e);
            }
        }
    };

    useEffect(() => {
        fetchFarmId();
    }, []);

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'topRight',
            onClose: () => console.log('Notification was closed.'),
        });
    };

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 500,
                background: '#f5f5f5',
                borderRadius: '20px',
            }}
        >
            <Card
                title="My Cows"
                bordered={false}
                style={{ height: '38vw' }}
                extra={<Button type="primary" onClick={showModal}>Add Cow</Button>}
            />
            <CreateCowModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                farmId={farmId}
                openNotification={openNotification}
            />
        </Content>
    );
};

export default CowUser;