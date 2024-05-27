import React, {useState, useEffect} from "react";
import { Modal, Input, Table  } from "antd";
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
    ];

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