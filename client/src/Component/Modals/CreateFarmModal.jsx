import {Input, Modal} from "antd";
import React, { useState } from "react";

const CreateFarmModal = ({ isModalVisible, handleOk, handleCancel}) => {
    const [farmName, setFarmName] = useState('');



    const handleCreateFarm = async () => {
        try {
            const token = localStorage.getItem("decodedToken");
            const userId = decodedToken.userId;
            const farmerResponse = await axios({
                method: 'get',
                url: `/api/farmer/${userId}`,
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token to the request headers
                },
            });

            const farmerId = farmerResponse.data;

            // Create the farm
            const response = await axios({
                method: 'post',
                url: '/api/farmer/createFarm',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the token to the request headers
                },
                data: {
                    farmerId: farmerId,
                    name: farmName,
                },
            });

            if (response.status === 200) {
                handleOk();
            } else {
                // Handle error
                console.error('Failed to create farm');
            }
        } catch (error) {
            // Handle error
            console.error('Failed to create farm', error);
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