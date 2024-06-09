import React, { useState, useEffect } from "react";
import { Button, Card, Layout, notification, Descriptions, Statistic, Divider, Row, Col, List } from "antd";
import axios from 'axios';
import CreateFarmModal from "../Modals/CreateFarmModal.jsx";
import './MyFarmUser.css';


const { Content } = Layout;

const MyFarmUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [farm, setFarm] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            placement: 'topRight',
            duration: 3,
        });
    };

    useEffect(() => {
        if (alertMessage) {
            openNotification(alertMessage.type, alertMessage.message);
            setAlertMessage(null);
        }
    }, [alertMessage]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log('token:', token);
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
                        <Descriptions title="Farm Information" bordered>
                            <Descriptions.Item label="Name">{farm.name}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        <Row gutter={16}>
                            <Col span={24}>
                                <Statistic title="Total Cows" value={farm.totalCows} />
                            </Col>
                        </Row>
                        <Divider />
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <List
                                className="scrollable-list"
                                header={<div>Milk Production</div>}
                                bordered
                                dataSource={farm.monthlyMilkProductions}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={new Date(item.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                                            description={`Total Milk Produced: ${item.totalMilkProduced} liters`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
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
