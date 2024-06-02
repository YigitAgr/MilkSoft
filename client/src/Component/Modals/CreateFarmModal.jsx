import { Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateFarmModal = ({ isModalVisible, handleOk, handleCancel, setAlertMessage, setIsAlertVisible }) => {
    const [farmName, setFarmName] = useState('');

    useEffect(() => {
        if (isModalVisible) {
            setFarmName('');
        }
    }, [isModalVisible]);

    const handleCreateFarm = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                const farmerResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { farmerId, associationId } = farmerResponse.data;

                if (farmerResponse.status === 200) {
                    const response = await axios.post('http://localhost:8080/api/farmer/createFarm', {
                        farmerId: farmerId,
                        associationId: associationId,
                        farmName: farmName,
                    }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (response.status === 200) {
                        setAlertMessage({
                            type: 'success',
                            message: 'Success',
                            description: 'Farm created successfully',
                        });
                    } else {
                        setAlertMessage({
                            type: 'error',
                            message: 'Error',
                            description: 'Failed to create farm',
                        });
                    }
                }
            } catch (e) {
                if (e.response && e.response.status === 403) {
                    setAlertMessage({
                        type: 'error',
                        message: 'Authorization error',
                        description: 'Invalid token',
                    });
                } else {
                    setAlertMessage({
                        type: 'error',
                        message: 'Error',
                        description: 'An unexpected error occurred',
                    });
                }
            }
        } else {
            setAlertMessage({
                type: 'error',
                message: 'Error',
                description: 'Token not found',
            });
        }

        setIsAlertVisible(true);
        handleOk(); // Close the modal after creating the farm
    };

    return (
        <Modal
            title="Create Farm"
            visible={isModalVisible}
            onOk={handleCreateFarm}
            okText="Create"
            onCancel={handleCancel}
            wrapClassName="my-modal-class"
            okButtonProps={{ disabled: !farmName }} // Disable the button if the input is empty
        >
            <div className="white-scrollbar" style={{ height: '250px', overflow: 'auto' }}>
                <Input
                    placeholder="Farm Name"
                    style={{ marginTop: '5%' }}
                    value={farmName}
                    onChange={e => setFarmName(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default CreateFarmModal;
