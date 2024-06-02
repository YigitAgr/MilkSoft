import React, { useState } from "react";
import { Card, Modal, Layout } from "antd";

const { Content } = Layout;

const FarmCards = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFarm, setSelectedFarm] = useState(null);

    const farms = [
        { id: 1, name: "Farm 1", description: "Description of Farm 1" },
        { id: 2, name: "Farm 2", description: "Description of Farm 2" },
        // Add more farms as needed
    ];

    const showModal = (farm) => {
        setSelectedFarm(farm);
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {farms.map(farm => (
                    <Card
                        key={farm.id}
                        title={farm.name}
                        hoverable
                        style={{
                            width: '200px',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            borderRadius: '10px'
                        }}
                        onClick={() => showModal(farm)}
                    >
                        {farm.description}
                    </Card>
                ))}
            </div>
            {selectedFarm && (
                <Modal
                    title={selectedFarm.name}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    wrapClassName="my-modal-class"
                >
                    <p>{selectedFarm.description}</p>
                    {/* Add more content related to the selected farm if needed */}
                </Modal>
            )}
        </Content>
    );
};

export default FarmCards;
