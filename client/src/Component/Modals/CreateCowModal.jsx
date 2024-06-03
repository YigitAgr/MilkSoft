import { Input, Modal, DatePicker, Checkbox, Select } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateCowModal = ({ isModalVisible, handleOk, handleCancel, setAlertMessage, setIsAlertVisible,farmId }) => {
    const [earTag, setEarTag] = useState('');
    const [breed, setBreed] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [isAdult, setIsAdult] = useState(false);
    const [isPregnant, setIsPregnant] = useState(false);

    useEffect(() => {
        if (isModalVisible) {
            setEarTag('');
            setBreed(null);
            setBirthDate(null);
            setIsAdult(false);
            setIsPregnant(false);
        }

        }, [isModalVisible]);


    const handleCreateCow = async () => {
        const cowData = {
            earTag: earTag,
            breed: breed,
            birthDate: birthDate,
            isAdult: isAdult,
            isPregnant: isPregnant,
            farmId: farmId,
        };

        try {
            const response = await axios.post('/api/cow/create', cowData);

            if (response.status === 200) {
                handleOk(); // Close the modal
                setAlertMessage('Cow created successfully');
                setIsAlertVisible(true);
            } else {
                setAlertMessage('Failed to create cow');
                setIsAlertVisible(true);
            }
        } catch (error) {
            console.error('Failed to create cow: ', error);
            setAlertMessage('Failed to create cow');
            setIsAlertVisible(true);
        }
    };

    return (
        <Modal
            title="Create Cow"
            visible={isModalVisible}
            onOk={handleCreateCow}
            okText="Create"
            onCancel={handleCancel}
            wrapClassName="my-modal-class"
            okButtonProps={{ disabled: !earTag || !breed || !birthDate }} // Disable the button if any of the required inputs are empty
        >
            <div className="white-scrollbar" style={{ height: '250px', overflow: 'auto' }}>
                <Input
                    placeholder="Ear Tag"
                    style={{ marginTop: '5%' }}
                    value={earTag}
                    onChange={e => setEarTag(e.target.value)}
                />
                <Select
                    placeholder="Select a breed"
                    style={{ marginTop: '5%', width: '100%' }}
                    value={breed}
                    onChange={value => setBreed(value)}
                >
                    <Option value="Holstein">Holstein</Option>
                    <Option value="Jersey">Jersey</Option>
                    <Option value="Simental">Simental</Option>
                    <Option value="Zavot">Zavot</Option>
                </Select>
                <DatePicker
                    placeholder="Birth Date"
                    style={{ marginTop: '5%', width: '100%' }}
                    value={birthDate}
                    onChange={date => setBirthDate(date)}
                />
                <Checkbox
                    style={{ marginTop: '5%' }}
                    checked={isAdult}
                    onChange={e => setIsAdult(e.target.checked)}
                >
                    Is Adult
                </Checkbox>
                <Checkbox
                    style={{ marginTop: '5%' }}
                    checked={isPregnant}
                    onChange={e => setIsPregnant(e.target.checked)}
                >
                    Is Pregnant
                </Checkbox>
            </div>
        </Modal>
    );
};

export default CreateCowModal;