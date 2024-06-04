import { Input, Modal, DatePicker, Checkbox, Select, notification } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const { Option } = Select;

const CreateCowModal = ({ isModalVisible, handleOk, handleCancel, farmId, addCow }) => {
   const [earTag, setEarTag] = useState('');
    const [breed, setBreed] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [isAdult, setIsAdult] = useState(false);
    const [isPregnant, setIsPregnant] = useState(false);
    const [fatherEarTag, setFatherEarTag] = useState('');
    const [motherEarTag, setMotherEarTag] = useState('');

    useEffect(() => {
        if (isModalVisible) {
            setEarTag('');
            setBreed(null);
            setBirthDate(null);
            setIsAdult(false);
            setIsPregnant(false);
            setFatherEarTag('');
            setMotherEarTag('');
        }
    }, [isModalVisible]);

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'topRight',
            duration: 3
        });
    };

    const handleCreateCow = async () => {
        const cowData = {
            earTag: earTag,
            breed: breed,
            birthDate: birthDate,
            isAdult: isAdult,
            isPregnant: isPregnant,
            farmId: farmId,
            fatherEarTag: fatherEarTag,
            motherEarTag: motherEarTag
        };

        try {
            const response = await axios.post('http://localhost:8080/api/cow/create', cowData);

            if (response.status === 200) {
                handleOk(); // Close the modal
                addCow(response.data); // Add the new cow to the parent component's state
                openNotification('success', 'Cow created successfully', '');
            } else {
                openNotification('error', 'Failed to create cow', '');
            }
        } catch (error) {
            console.error('Failed to create cow: ', error);
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
    };

    return (
        <Modal
            title="Create Cow"
            visible={isModalVisible}
            onOk={handleCreateCow}
            okText="Create"
            onCancel={handleCancel}
            wrapClassName="my-modal-class"
            okButtonProps={{ disabled: !earTag || !breed || !birthDate }}
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
                <Input
                    placeholder="Father Ear Tag (optional)"
                    style={{ marginTop: '5%' }}
                    value={fatherEarTag}
                    onChange={e => setFatherEarTag(e.target.value)}
                />
                <Input
                    placeholder="Mother Ear Tag (optional)"
                    style={{ marginTop: '5%' }}
                    value={motherEarTag}
                    onChange={e => setMotherEarTag(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default CreateCowModal;
