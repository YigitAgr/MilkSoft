import React, {useState, useEffect} from "react";
import { Modal, Input, Table, Button  } from "antd";
import './AssociationFindModal.css';
import axios from 'axios'; // Make sure to install this package

const AssociationFindModal = ({ isModalVisible, handleOk, handleCancel }) => {
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
        const token = localStorage.getItem("decodedToken");
        let userId;
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                userId = decodedToken.userId;
            } catch (e) {
                console.error('Invalid JWT token', e);
            }
        }

        const associationId = record.id;

        const utf8Token = unescape(encodeURIComponent(token));

        axios.post(`http://localhost:8080/api/v1/membership/sendRequest?farmerId=${userId}&associationId=${associationId}`, null, {
            headers: {
                'Authorization': `Bearer ${btoa(unescape(encodeURIComponent(token)))}`
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    console.error('Authorization error! Check your token.');
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