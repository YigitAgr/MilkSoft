import React, { useState, useEffect } from "react";
import { Card, Layout, Button, notification, Pagination, Empty, Input, Spin, message } from "antd";
import axios from 'axios';
import FarmCards from "./FarmCards.jsx";

const { Content } = Layout;

const FarmsContent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const updateFarm = (updatedFarm) => {
        setFarms(farms.map(farm => farm.id === updatedFarm.id ? updatedFarm : farm));
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

    const fetchFarms = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        let userId;
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                userId = decodedToken.userId;
            } catch (e) {
                console.error('Invalid JWT token', e);
            }
            try {
                const associationIdResponse = await axios.get(`http://localhost:8080/api/association/getAssociationId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const associationId = associationIdResponse.data;
                console.log("assso",associationId);
                const farmsResponse = await axios.get(`http://localhost:8080/api/farm/getFarms/${associationId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setFarms(farmsResponse.data);
                console.log("responsee",farmsResponse.data)
            } catch (error) {
                console.error('Failed to fetch farms: ', error);
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                }
            } finally {
                setLoading(false);
            }
        }
    };





    useEffect(() => {
        fetchFarms();
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
                title="Farms"
                bordered={false}
                extra={<Button type="primary" onClick={showModal}>Add Farm</Button>}
                loading={loading}
            >
                <Input
                    style={{ width: '200px' }}
                    placeholder="Search by farm name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {farms && farms.length > 0 ? (
                    <>
                        <FarmCards currentPage={currentPage} itemsPerPage={itemsPerPage} updateFarm={updateFarm} farms={farms.filter(farm => farm.name && farm.name.includes(searchTerm))
                        } />
                        <Pagination
                            current={currentPage}
                            total={farms.length}
                            pageSize={itemsPerPage}
                            onChange={page => setCurrentPage(page)}
                        />
                    </>
                ) : (
                    <Empty description="No Data" />
                )}
            </Card>
            {/* Add FarmModal for creating new farms, similar to CreateCowModal */}
        </Content>
    );
};

export default FarmsContent;
