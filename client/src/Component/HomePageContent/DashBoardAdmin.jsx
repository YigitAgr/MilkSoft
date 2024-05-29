import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Table } from 'antd';
import axios from 'axios';
import YearlyMilkProduction from "../Graphs/YearlyMilkProduction.jsx";

const { Content } = Layout;

const DashBoardAdmin = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [currentFarmers, setCurrentFarmers] = useState(0);



    useEffect(() => {
        const token = localStorage.getItem("decodedToken");
        if (token) {
            try {
                const decodedToken = JSON.parse(token);
                const userId = decodedToken.userId;
                axios.get(`http://localhost:8080/api/association/pendingRequests/${userId}`)
                    .then(response => {
                        setPendingRequests(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

                // New axios request for current farmers
                axios.get(`http://localhost:8080/api/association/userCount/${userId}`)
                    .then(response => {
                        setCurrentFarmers(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            } catch (e) {
                console.error('Invalid token', e);
            }
        }
    }, []);

    useEffect(() => {
        console.log('useEffect started');
        const token = localStorage.getItem("decodedToken");
        console.log('Token:', token); // Debug line
        if (token) {
            try {
                const decodedToken = JSON.parse(token);
                const userId = decodedToken.userId;
                console.log('Sending request for user:', userId); // Debug line
                axios.get(`http://localhost:8080/api/association/pendingRequests/${userId}`)
                    .then(response => {
                        console.log('Response received', response.data);
                        setPendingRequests(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            } catch (e) {
                console.error('Invalid token', e);
            }
        } else {
            console.log('Token is not valid or not in the expected format'); // Debug line
        }
        console.log('useEffect ended');
    }, []);


    const columns = [
        {
            title: 'Farmer Name',
            dataIndex: 'farmerName',
            key: 'farmerName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#f5f5f5', // You can customize the background color
                borderRadius: '20px', // You can customize the border radius
            }}
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={6}>
                    <Card title="Number Of Registered Farmers" bordered={false}>
                        {currentFarmers} {/* Display current farmers count */}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Milk Collected This Month" bordered={false}>
                        100Lt
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Active Customers" bordered={false}>
                        33%
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Churn Rate" bordered={false}>
                        2%
                    </Card>
                </Col>
            </Row>
            <Row className="equal-height" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={16}>
                    <Card title="Annual Milk Production by Month" bordered={false}>
                        <div style={{ height: '25vw' }}> {/* Adjust this value as needed */}
                        <YearlyMilkProduction></YearlyMilkProduction>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Pending Membership Request" bordered={false} className="big-card">
                        <div style={{ height: '25vw' }}> {/* Adjust this value as needed */}
                            <Table columns={columns} dataSource={pendingRequests} pagination={false} />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Card title="Support Tickets" bordered={false}>
                        {/* Insert Support Tickets Here */}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Customer Demographic" bordered={false}>
                        {/* Insert Customer Demographic Map Here */}
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default DashBoardAdmin;
