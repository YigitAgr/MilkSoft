import React, { useState } from "react";
import { Card, Modal, Layout, Form, Input } from "antd";

const { Content } = Layout;

const CowCard = ({ cow, onClick }) => (
    <Card
        title={`Ear Tag: ${cow.earTag}`}
        hoverable
        style={{
            width: '200px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '10px',
            marginBottom: '30px',
            marginTop: '40px'
        }}
        onClick={() => onClick(cow)}
    >
        Breed: {cow.breed}
    </Card>
);

const CowCards = ({ currentPage, itemsPerPage, cows }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);

    const showModal = (cow) => {
        setSelectedCow(cow);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Calculate the index of the first and last cow for the current page
    const indexOfLastCow = currentPage * itemsPerPage;
    const indexOfFirstCow = indexOfLastCow - itemsPerPage;

    // Slice the cows array to get only the cows for the current page
    const currentCows = cows.slice(indexOfFirstCow, indexOfLastCow);

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
                {currentCows.map((cow, index) => (
                    <CowCard key={index} cow={cow} onClick={showModal} />
                ))}
            </div>
            {selectedCow && (
                <Modal
                    title={`Cow ${selectedCow.earTag}`}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText={"Edit"}
                    wrapClassName="my-modal-class"
                >
                    Breed: {selectedCow.breed}<br/>
                    Birth Date: {new Date(selectedCow.birthDate).toLocaleDateString()}<br/>
                    Is Adult: {selectedCow.isAdult ? 'Yes' : 'No'}<br/>
                    Is Pregnant: {selectedCow.isPregnant ? 'Yes' : 'No'}
                </Modal>
            )}
        </Content>
    );
};

export default CowCards;