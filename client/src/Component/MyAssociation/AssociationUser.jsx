import React, { useState, useEffect } from "react";
import { Card, Layout, Button, Spin } from "antd";
import AssociationFindModal from "../Modals/AssociationFindModal.jsx";
import axios from 'axios';

const { Content } = Layout;

const AssociationUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [association, setAssociation] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                // First request to get the farmerId
                axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(idsResponse => {
                        const farmerId = idsResponse.data.farmerId;
                        console.log("farmer ıd", farmerId);

                        // Second request to get the association using the farmerId
                        axios.get(`http://localhost:8080/api/farmer/associations/farmer/${farmerId}`)
                            .then(associationResponse => {
                                setAssociation(associationResponse.data);
                                setIsLoading(false); // Set loading to false when the request is complete
                            })
                            .catch(error => {
                                console.error('There was an error!', error);
                                setIsLoading(false); // Set loading to false when an error occurs
                            });
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                        setIsLoading(false); // Set loading to false when an error occurs
                    });
            } catch (e) {
                console.error('Invalid JWT token', e);
                setIsLoading(false); // Set loading to false if token parsing fails
            }
        } else {
            setIsLoading(false); // Set loading to false if no valid token is found
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
                <Spin size="large" /> // Render a loading spinner when isLoading is true
            ) : (
                <Card style={{ width: '100%', height: '38vw', position: 'relative' }}>
                    {association ? (
                        <>
                            <h2>{association.name}</h2>
                            <p>{association.city}</p>
                            {/* Display other association details here */}
                            <p>You are registered in an association.</p>
                        </>
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', // Make sure the message is vertically centered
                            fontSize: '20px',
                        }}>
                            <p>You are not registered in any associations.</p>
                        </div>
                    )}
                    {!association && ( // Render the button only if association is null
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
                    />
                </Card>
            )}
        </Content>
    );
};

export default AssociationUser;
