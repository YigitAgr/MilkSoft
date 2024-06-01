import React, { useState, useEffect } from "react";
import {Card, Layout, Button} from "antd";
import AssociationFindModal from "../Modals/AssociationFindModal.jsx";
import axios from 'axios';

const { Content } = Layout;

const AssociationUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [association, setAssociation] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("decodedToken");
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;
                axios.get(`http://localhost:8080/api/farmer/associations/${userId}`)
                    .then(response => {
                        setAssociation(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            } catch (e) {
                console.error('Invalid JWT token', e);
            }
        }
        console.log(association);
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
            }}
        >
            <Card style={{ width: '100%', height: '38vw', position: 'relative' }}>
                {association ? (
                    <>
                        <h2>{association.name}</h2>
                        <p>{association.city}</p>
                        {/* Display other association details here */}
                    </>
                ) : (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20%',
                        fontSize: '20px',
                    }}>
                        <p>You are not registered in any associations.</p>
                    </div>
                )}
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{position: 'absolute', top: '10%', right: '5%'}}
                >
                    Find Association
                </Button>
                <AssociationFindModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </Card>
        </Content>
    );
}

export default AssociationUser;