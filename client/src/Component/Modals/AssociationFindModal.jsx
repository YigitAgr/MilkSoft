import React, { useState, useEffect } from "react";
import { Modal, Input, Table, Button, notification } from "antd";

import './AssociationFindModal.css';
import axios from 'axios';

const AssociationFindModal = ({ isModalVisible, handleOk, handleCancel, farmerId }) => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/farmer/associations')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => handleButtonClick(record)}>Participation Request</Button>
            ),
        },
    ];

    const handleButtonClick = (record) => {
        const token = localStorage.getItem("token");
        const associationId = record.id;

        console.log("associationId, farmerId, token", associationId, token);

        axios.post(`http://localhost:8080/api/v1/membership/sendRequest?farmerId=${farmerId}&associationId=${associationId}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                notification.success({
                    message: 'Success',
                    description: 'Participation request sent successfully!',
                });
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        const errorMessage = error.response.data;
                        if (errorMessage.includes('A request from this user to this association already exists.')) {
                            notification.error({
                                message: 'Error',
                                description: 'A request from this user to this association already exists.',
                            });
                        } else {
                            notification.error({
                                message: 'Error',
                                description: `Error: ${errorMessage}`,
                            });
                        }
                    } else if (error.response.status === 403) {
                        notification.error({
                            message: 'Authorization Error',
                            description: 'Authorization error! Check your token.',
                        });
                    } else {
                        notification.error({
                            message: 'Error',
                            description: 'An error occurred while sending the request.',
                        });
                    }
                } else {
                    console.error('There was an error!', error);
                }
            });
    };


    const filteredData = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Modal
            title="Find Association"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            bodyStyle={{ overflow: 'auto' }}
        >
            <Input.Search
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                enterButton
            />
            <div className="white-scrollbar" style={{ height: '250px', overflow: 'auto' }}>
                <Table columns={columns} dataSource={filteredData} pagination={false} />
            </div>
        </Modal>
    );
}

export default AssociationFindModal;
