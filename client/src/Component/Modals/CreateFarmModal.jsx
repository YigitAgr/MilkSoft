import {Input, Modal} from "antd";
import React, { useState } from "react";
import axios from "axios";

const CreateFarmModal = ({ isModalVisible, handleOk, handleCancel}) => {
    const [farmName, setFarmName] = useState('');



    const handleCreateFarm = async () => {
        // Retrieve token directly from local storage
        const token = localStorage.getItem('token');
        console.log("token1",token);
        if (token) {
            try {
                // Decode JWT token payload
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                // Make a GET request to get the farmer ID
                const farmerResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` } // Use the correct token
                });
                const farmerId = farmerResponse.data;
                console.log("farmerId1",farmerId);

                // Ensure the first request has completed before starting the second
                if (farmerResponse.status === 200) {
                    // Make a POST request to create the farm
                    const response = await axios.post('http://localhost:8080/api/farmer/createFarm', {
                        farmerId: farmerId,
                        name: farmName,
                    }, {
                        headers: { 'Authorization': `Bearer ${token}` } // Use the correct token
                    });
                    console.log("farmerId,FarmNmae",farmerId,farmName);
                    console.log("token2",token);
                    if (response.status === 200) {
                        console.log('Farm created successfully');
                    } else {
                        console.error('Failed to create farm');
                    }
                }
            } catch (e) {
                if (e.response && e.response.status === 403) {
                    console.error('Authorization error: Invalid token');
                    console.error(e.response.data);
                } else {
                    console.error(e);
                }
            }
        } else {
            console.error('Token not found');
        }
    };







    return (
        <Modal
            title="Create Farm"
            visible={isModalVisible}
            onOk={handleCreateFarm}
            okText="Create"
            onCancel={handleCancel}
            wrapClassName="my-modal-class"
        >
            <div className="white-scrollbar" style={{height: '250px', overflow: 'auto'}}>
                <Input
                    placeholder="Farm Name"
                    style={{marginTop: '5%'}}
                    onChange={e => setFarmName(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default CreateFarmModal;