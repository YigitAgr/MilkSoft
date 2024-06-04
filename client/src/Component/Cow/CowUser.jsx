import React, { useState, useEffect } from "react";
import { Card, Layout, Button, notification, Pagination, Empty, Input } from "antd";
import axios from 'axios';
import CreateCowModal from '../Modals/CreateCowModal.jsx';
import CowCards from "./CowCards.jsx";

const { Content } = Layout;

const CowUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [farmId, setFarmId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };

    const updateCow = (updatedCow) => {
        setCows(cows.map(cow => cow.id === updatedCow.id ? updatedCow : cow));
    };

    const addCow = (newCow) => {
        setCows(prevCows => [...prevCows, newCow]);
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [cows, setCows] = useState([]);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const fetchCows = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:8080/api/cow/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCows(response.data);
            } catch (error) {
                console.error('Failed to fetch cows: ', error);
            }
        }
    };

    const fetchFarmId = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                const farmerResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { farmerId } = farmerResponse.data;

                // Now use the farmerId to get the farmId
                const farmResponse = await axios.get(`http://localhost:8080/api/farm/getFarmId/${farmerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const fetchedFarmId = farmResponse.data;
                setFarmId(fetchedFarmId);
            } catch (e) {
                console.error('Failed to fetch data: ', e);
            }
        }
    };

    useEffect(() => {
        fetchFarmId();
        fetchCows();
    }, []);

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'topRight',
            onClose: () => console.log('Notification was closed.'),
        });
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
            <Card
                title="My Cows"
                bordered={false}
                extra={<Button type="primary" onClick={showModal}>Add Cow</Button>}
            >
                <Input
                    style={{ width: '200px' }}
                    placeholder="Search by ear tag"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {cows.length > 0 ? (
                    <>
                        <CowCards currentPage={currentPage} itemsPerPage={itemsPerPage} updateCow={updateCow} cows={cows.filter(cow => cow.earTag.includes(searchTerm))} /> {/* Filter cows by search term */}
                        <Pagination
                            current={currentPage}
                            total={cows.length} // You need to pass the total number of cows here
                            pageSize={itemsPerPage}
                            onChange={page => setCurrentPage(page)}
                        />
                    </>
                ) : (
                    <Empty description="No Data" />
                )}
            </Card>
            <CreateCowModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                farmId={farmId}
                openNotification={openNotification}
                addCow={addCow} // Pass the addCow function to the CreateCowModal
            />
        </Content>
    );
};

export default CowUser;