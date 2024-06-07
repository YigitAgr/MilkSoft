import React, { useState, useEffect } from 'react';
import { Card, Spin, Descriptions, Avatar, Button, Modal, Form, Input } from "antd";
import axios from 'axios';

const MyAssociationTab = () => {
    const [associationId, setAssociationId] = useState(null);
    const [associationInfo, setAssociationInfo] = useState(null);
    const [userCount, setUserCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchAssociationId = async () => {
        const token = localStorage.getItem("token");
        let userId;

        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                userId = decodedToken.userId;
            } catch (e) {
                console.error('Invalid JWT token', e);
                setError('Invalid token');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/association/getAssociationId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAssociationId(response.data);
            } catch (err) {
                console.error('There was an error!', err);
                setError('Failed to fetch association ID');
                setLoading(false);
                return;
            }
        } else {
            setError('No valid token found');
            setLoading(false);
            return;
        }
    };

    const fetchAssociationInfo = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:8080/api/association/info/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssociationInfo(response.data);
        } catch (err) {
            console.error('There was an error!', err);
            setError('Failed to fetch association info');
        }
    };

    const fetchUserCount = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:8080/api/association/userCount/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserCount(response.data);
        } catch (err) {
            console.error('There was an error!', err);
            setError('Failed to fetch user count');
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await fetchAssociationId();
        };

        initialize();
    }, []);

    useEffect(() => {
        if (associationId !== null) {
            fetchAssociationInfo(associationId);
            fetchUserCount(associationId);
            setLoading(false);
        }
    }, [associationId]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:8080/api/association/update/${associationId}`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchAssociationInfo(associationId);
            setIsModalVisible(false);
        } catch (err) {
            console.error('There was an error updating the association info!', err);
        }
    };

    if (loading) {
        return <Spin />;
    }

    if (error) {
        return <Card>{error}</Card>;
    }

    return (
        <Card style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            {associationInfo ? (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar size={64} style={{marginRight: '20px'}}>
                                {associationInfo.name.charAt(0)}
                            </Avatar>
                            <h2 style={{margin: 0}}>{associationInfo.name}</h2>
                        </div>
                        <Button type="primary" onClick={showModal}>Edit</Button>
                    </div>

                    <Descriptions bordered>
                        <Descriptions.Item label="City">{associationInfo.city}</Descriptions.Item>
                        <Descriptions.Item label="Registered Farmers">{userCount}</Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <p>No association info available</p>
            )}
            <Modal
                title="Update Association"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="updateAssociation"
                    onFinish={onFinish}
                    initialValues={{ name: associationInfo?.name, city: associationInfo?.city }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the association name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: 'Please input the city!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}

export default MyAssociationTab;
