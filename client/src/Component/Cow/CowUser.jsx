import React, { useState, useEffect } from "react";
import {Card, Layout, Button, notification, Pagination, Empty, Input, Spin, message} from "antd";
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
    const [cows, setCows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            placement: 'topRight',
        });
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

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const fetchCows = async (farmId) => {
        if (!farmId) return;
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`http://localhost:8080/api/cow/farm/${farmId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCows(response.data);
            } catch (error) {
                console.error('Failed to fetch cows: ', error);
            } finally {
                setLoading(false);
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
                const { farmerId, associationId } = farmerResponse.data;
                const farmResponse = await axios.get(`http://localhost:8080/api/farm/getFarmId/${farmerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const fetchedFarmId = farmResponse.data;
                setFarmId(fetchedFarmId);
                return fetchedFarmId;
            } catch (e) {
                console.error('Failed to fetch data: ', e);
                if (e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    notification.open({
                        message: 'To begin, you\'ll need to establish a farm.',
                        type: 'info',
                    });

                }
            }
        }
    };

    useEffect(() => {
        const initialize = async () => {
            const fetchedFarmId = await fetchFarmId();
            if (fetchedFarmId) {
                await fetchCows(fetchedFarmId);
            }
        };
        initialize();
    }, []);

    useEffect(() => {
        if (error) {
            notification.error({
                message: 'Error',
                description: error,
                placement: 'topRight',
            });
            setError(null);
        }
    }, [error]);

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
                extra={farmId && <Button type="primary" onClick={showModal}>Add Cow</Button>}
                loading={loading}
            >
                <Input
                    style={{ width: '200px' }}
                    placeholder="Search by ear tag"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {cows.length > 0 ? (
                    <>
                        <CowCards currentPage={currentPage} itemsPerPage={itemsPerPage} updateCow={updateCow} cows={cows.filter(cow => cow.earTag.includes(searchTerm))} />
                        <Pagination
                            current={currentPage}
                            total={cows.length}
                            pageSize={itemsPerPage}
                            onChange={page => setCurrentPage(page)}
                        />
                    </>
                ) : (
                    <Empty description="No Data" />
                )}
            </Card>
            {farmId && (
                <CreateCowModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    farmId={farmId}
                    openNotification={openNotification}
                    addCow={addCow}
                />
            )}
        </Content>
    );
};

export default CowUser;
