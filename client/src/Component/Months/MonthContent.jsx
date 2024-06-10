import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Pagination, Empty, Spin, Row, Col, Button, Modal, Form, InputNumber } from "antd";

const { Content } = Layout;
const { Item } = Form;

const MonthContent = () => {
    const pageSize = 6; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [months, setMonths] = useState([
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]);
    const [temperatureRecords, setTemperatureRecords] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [averageWet, setAverageWet] = useState(null);
    const [associationId, setAssociationId] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(false);


    useEffect(() => {
        const fetchTemperatureRecords = async () => {
            setLoading(true);
            try {
                // Retrieve userId from localStorage
                const userId = localStorage.getItem('token');
                if (!userId) {
                    throw new Error('User ID not found in localStorage');
                }

                // Fetch association ID using userId
                const associationId = await fetchAssociationId(userId);
                console.log("assspo",associationId)
                // Fetch temperature records by association ID
                const response = await axios.get(`http://localhost:8080/api/temperature-records/by-association/${associationId}`);
                const recordsByMonth = {};

                response.data.forEach(record => {
                    record.temperatures.forEach(temp => {
                        const { month } = temp;
                        if (!recordsByMonth[month]) {
                            recordsByMonth[month] = [];
                        }
                        recordsByMonth[month].push(temp);
                    });
                });

                setTemperatureRecords(recordsByMonth);
                console.log(recordsByMonth);
            } catch (error) {
                console.error("Error fetching temperature records:", error);
                setError("Error fetching temperature records.");
            } finally {
                setLoading(false);
            }
        };

        fetchTemperatureRecords();
    }, []);

    const fetchAssociationId = async (userId) => {
        const token = localStorage.getItem('token'); // Use the correct token name
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                console.log("asdds",decodedToken)// Decode the JWT token
                const userId = decodedToken.userId;
                const response = await axios.get(`http://localhost:8080/api/association/getAssociationId/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const associationId = response.data; // Extract association ID from the response
                setAssociationId(associationId); // Save association ID to state
                return associationId;
            } catch (error) {
                console.error('Error fetching association ID', error);
                throw error;
            }
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEdit = async (month) => {
        setCurrentMonth(month);
        setModalVisible(true);
    };

    const handleCreate = async (month) => {
        setCurrentMonth(month);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            const id = temperatureRecords[currentMonth][0].id;
            console.log("deneme",temperatureRecords)
            const requestBody = {
                temperatures: [{
                    temperature: temperature,
                    averageWet: averageWet,
                    month: currentMonth
                }]
            };

            const response = await axios.put(`http://localhost:8080/api/temperature-records/update/${id}`, requestBody);
            console.log(`Updating data for ${currentMonth}:`, response.data);

            const updatedRecord = response.data;
            setTemperatureRecords(prevRecords => ({
                ...prevRecords,
                [currentMonth]: [updatedRecord]
            }));

            setForceUpdate(prev => !prev);
            setModalVisible(false);
        } catch (error) {
            console.error(`Error updating data for ${currentMonth}:`, error);
        }
    };

    const handleCreateRecord = async () => {
        try {
            const requestBody = {
                temperatures: [
                    {
                        temperature: temperature,
                        averageWet: averageWet,
                        month: currentMonth
                    }
                ],
                associationId: associationId,
            };

            console.log(requestBody)

            const response = await axios.post(`http://localhost:8080/api/temperature-records/create`, requestBody);
            console.log(`Creating data for ${currentMonth}:`, response.data);

            const createdRecord = response.data;
            setTemperatureRecords(prevRecords => ({
                ...prevRecords,
                [currentMonth]: [createdRecord]
            }));

            setModalVisible(false);
        } catch (error) {
            console.error(`Error creating data for ${currentMonth}:`, error);
        }
    };

    const handleModalOk = async () => {
        if (temperatureRecords[currentMonth] && temperatureRecords[currentMonth].length > 0) {
            handleUpdate();
        } else {
            handleCreateRecord();
        }

        setTemperature(null);
        setAverageWet(null);
    };

    const handleTemperatureChange = (value) => {
        setTemperature(value);
    };

    const handleAverageWetChange = (value) => {
        setAverageWet(value);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const paginatedMonths = months.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            {loading ? (
                <Spin size="large" />
            ) : (
                <Card
                    title="Monthly Temperature Records"
                    bordered={false}
                    loading={loading}
                >
                    {paginatedMonths && paginatedMonths.length > 0 ? (
                        <>
                            <Row gutter={[16, 16]}>
                                {paginatedMonths.map((month, index) => (
                                    <Col span={8} key={index}>
                                        <Card
                                            title={month}
                                            style={{ height: '100%' }} // Set a fixed height for all cards
                                        >
                                            {temperatureRecords[month] && temperatureRecords[month].length > 0 ? (
                                                temperatureRecords[month].map((record, idx) => (
                                                    <p key={idx}>
                                                        Temperature: {record.temperature} °C, Average Wet: {record.averageWet} %, Month: {record.month}
                                                    </p>
                                                ))
                                            ) : (
                                                <Empty description="No Data" />
                                            )}
                                            {temperatureRecords[month] && temperatureRecords[month].length > 0 ? (
                                                null
                                            ) : (
                                                <Button onClick={() => handleCreate(month)}>Create</Button>
                                            )}
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                current={currentPage}
                                total={months.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                style={{ marginTop: '16px' }}
                            />
                        </>
                    ) : (
                        <Empty description="No Data" />
                    )}
                </Card>
            )}
            <Modal
                title={`Enter Data for ${currentMonth}`}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form>
                    <Item label="Temperature">
                        <InputNumber style={{ width: "100%" }} value={temperature} onChange={handleTemperatureChange} />
                    </Item>
                    <Item label="Average Wet">
                        <InputNumber style={{ width: "100%" }} value={averageWet} onChange={handleAverageWetChange} />
                    </Item>
                </Form>
            </Modal>
        </Content>
    );

};

export default MonthContent;
