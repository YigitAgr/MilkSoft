import React, { useState, useEffect } from "react";
import { Button, Card, Layout, notification } from "antd";
import axios from 'axios';
import CreateFarmModal from "../Modals/CreateFarmModal.jsx";
import FarmCards from "./FarmCards.jsx";

const { Content } = Layout;

const MyFarmUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [farm, setFarm] = useState(null); // New state variable for the farm

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Function to display notification
    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            placement: 'topRight',
            duration: 3, // Auto close after 3 seconds
        });
    };

    // Show notification when alertMessage is set
    useEffect(() => {
        if (alertMessage) {
            openNotification(alertMessage.type, alertMessage.message);
            setAlertMessage(null); // Reset alert message after showing the notification
        }
    }, [alertMessage]);

    // New useEffect hook to fetch the farm
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log('token:', token); // New console.log statement
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;
                console.log('userId:', userId);
                axios.get(`http://localhost:8080/api/farmer/${userId}/farm`)
                    .then(response => {
                        setFarm(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } catch (e) {
                console.error('Invalid JWT token', e);
            }
        }
    }, []);

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
            <Card style={{ height: '38vw' }} title="Farms" bordered={false}>
                {!farm && (
                    <Button type="primary" style={{ float: 'right' }} onClick={showModal}>Create Farm</Button>
                )}
                {farm && (
                    <div>
                        <p>ID: {farm.id}</p>
                        <p>Name: {farm.name}</p>
                        <p>Total Cows: {farm.totalCows}</p>
                        <p>Daily Milk Production: {farm.dailyMilkProduction}</p>
                        {/* Add more fields as needed */}
                    </div>
                )}
            </Card>
            <CreateFarmModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                setAlertMessage={setAlertMessage}
            />
        </Content>
    );
};

export default MyFarmUser;