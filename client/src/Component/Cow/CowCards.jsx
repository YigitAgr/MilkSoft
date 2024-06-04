import React, { useState } from "react";
import { Card, Modal, Layout, Form, Input, Checkbox, notification } from "antd";
import axios from "axios";
import holsteinJpg from "../../assets/holstein.jpg";
import zavotJpg from "../../assets/zavot.jpg";
import jerseyJpg from "../../assets/jersey.jpg";
import simentalJpg from "../../assets/simental.jpg";
import './CowCard.css';


const { Content } = Layout;

const cardStyle = {
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
};

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 500,
    background: '#f5f5f5',
    borderRadius: '20px',
};

const breedJpgMap = {
    "Holstein": holsteinJpg,
    "Zavot": zavotJpg,
    "Jersey": jerseyJpg,
    "Simental": simentalJpg
};

const CowCard = ({ cow, onClick }) => {
    const { earTag, breed } = cow;
    const jpgIcon = breedJpgMap[breed];

    const cardStyleWithBackground = {
        ...cardStyle,
        backgroundImage: jpgIcon ? `url(${jpgIcon})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <Card
            title={<div className="custom-card-title">{`Ear Tag: ${earTag}`}</div>}
            hoverable
            style={cardStyleWithBackground}
            onClick={() => onClick(cow)}
        >
            Breed: {breed}
        </Card>
    );
};



const CowModal = ({ isModalVisible, handleOk, handleCancel, isEditMode, selectedCow, setSelectedCow }) => (
    <Modal
        title={`Cow ${selectedCow.earTag}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isEditMode ? "Save" : "Edit"}
        wrapClassName="my-modal-class"
    >
        {isEditMode ? (
            <CowForm selectedCow={selectedCow} setSelectedCow={setSelectedCow} />
        ) : (
            <>
                Breed: {selectedCow.breed}<br/>
                Birth Date: {new Date(selectedCow.birthDate).toLocaleDateString()}<br/>
                Is Adult: {selectedCow.isAdult ? 'Yes' : 'No'}<br/>
                Is Pregnant: {selectedCow.isPregnant ? 'Yes' : 'No'}
            </>
        )}
    </Modal>
);

const CowForm = ({ selectedCow, setSelectedCow }) => (
    <Form>
        <Form.Item label="Breed">
            <Input value={selectedCow.breed} onChange={e => setSelectedCow({...selectedCow, breed: e.target.value})} />
        </Form.Item>
        <Form.Item label="Birth Date">
            <Input type="date" value={new Date(selectedCow.birthDate).toISOString().substr(0, 10)} onChange={e => setSelectedCow({...selectedCow, birthDate: e.target.value})} />
        </Form.Item>
        <Form.Item label="Is Adult">
            <Checkbox checked={selectedCow.isAdult} onChange={e => setSelectedCow({...selectedCow, isAdult: e.target.checked})} />
        </Form.Item>
        <Form.Item label="Is Pregnant">
            <Checkbox checked={selectedCow.isPregnant} onChange={e => setSelectedCow({...selectedCow, isPregnant: e.target.checked})} />
        </Form.Item>
    </Form>
);

const CowCards = ({ currentPage, itemsPerPage, cows, updateCow }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCow, setSelectedCow] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'topRight',
            duration: 3
        });
    };

    const showModal = (cow) => {
        setSelectedCow(cow);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (isEditMode) {
            // If the form is in edit mode, send the updated cow information to the server
            const cowData = {
                earTag: selectedCow.earTag,
                breed: selectedCow.breed,
                birthDate: selectedCow.birthDate,
                isAdult: selectedCow.isAdult,
                isPregnant: selectedCow.isPregnant,
                farmId: selectedCow.farmId,
                fatherEarTag: selectedCow.fatherEarTag,
                motherEarTag: selectedCow.motherEarTag
            };

            try {
                const response = await axios.put(`http://localhost:8080/api/cow/edit/${selectedCow.id}`, cowData);

                if (response.status === 200) {
                    setIsModalVisible(false); // Close the modal
                    setIsEditMode(false); // Switch back to view mode
                    updateCow(response.data); // Update the cow in the parent component's state
                    openNotification('success', 'Cow updated successfully', '');
                } else {
                    openNotification('error', 'Failed to update cow', '');
                }
            } catch (error) {
                console.error('Failed to update cow: ', error);
                if (error.response) {
                    openNotification('error', error.response.data.message, '');
                } else if (error.request) {
                    openNotification('error', 'No response from server', '');
                    console.log(error.request);
                } else {
                    openNotification('error', 'Error: ' + error.message, '');
                    console.log('Error', error.message);
                }
            }
        } else {
            // If the form is not in edit mode, switch to edit mode
            setIsEditMode(true);
        }
    };

    const handleCancel = () => {
        setIsEditMode(false); // Switch back to view mode when the modal is closed
        setIsModalVisible(false);
    };

    // Calculate the index of the first and last cow for the current page
    const indexOfLastCow = currentPage * itemsPerPage;
    const indexOfFirstCow = indexOfLastCow - itemsPerPage;

    // Slice the cows array to get only the cows for the current page
    const currentCows = cows.slice(indexOfFirstCow, indexOfLastCow);

    return (
        <Content style={contentStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {currentCows.map((cow, index) => (
                    <CowCard key={index} cow={cow} onClick={showModal} />
                ))}
            </div>
            {selectedCow && (
                <CowModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    isEditMode={isEditMode}
                    selectedCow={selectedCow}
                    setSelectedCow={setSelectedCow}
                />
            )}
        </Content>
    );
};

export default CowCards;