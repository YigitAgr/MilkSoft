import React, { useState, useEffect } from "react";
import { Card, Layout, Button, Spin, Row, Col, Typography } from "antd";
import AssociationFindModal from "../Modals/AssociationFindModal.jsx";
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

const AssociationUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [association, setAssociation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [farmerId, setFarmerId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(idsResponse => {
                        const farmerId = idsResponse.data.farmerId;
                        setFarmerId(farmerId);

                        axios.get(`http://localhost:8080/api/farmer/associations/farmer/${farmerId}`)
                            .then(associationResponse => {
                                setAssociation(associationResponse.data);
                                setIsLoading(false);
                            })
                            .catch(error => {
                                console.error('There was an error!', error);
                                setIsLoading(false);
                            });
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                        setIsLoading(false);
                    });
            } catch (e) {
                console.error('Invalid JWT token', e);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 500,
                background: '#f5f5f5',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <Card style={{ width: '100%', height: '38vw', position: 'relative' }}>
                    {association ? (
                        <div>
                            <Title level={3}>{association.name}</Title>
                            <Text type="secondary">{association.city}</Text>
                            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                                <Col span={12}>
                                    <Card title="Association Details" size="small">
                                        <Text>{association.details}</Text>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card title="Contact Information" size="small">
                                        <Text>Email: {association.email}</Text>
                                        <br />
                                        <Text>Phone: {association.phone}</Text>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', fontSize: '20px' }}>
                            <p>You are not registered in any associations.</p>
                        </div>
                    )}
                    {!association && (
                        <Button
                            type="primary"
                            onClick={showModal}
                            style={{ position: 'absolute', top: '10%', right: '5%' }}
                        >
                            Find Association
                        </Button>
                    )}
                    <AssociationFindModal
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        farmerId={farmerId}
                    />
                </Card>
            )}
        </Content>
    );
};

export default AssociationUser;
