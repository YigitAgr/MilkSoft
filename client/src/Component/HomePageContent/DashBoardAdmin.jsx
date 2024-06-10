import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Table } from 'antd';
import axios from 'axios';
import YearlyMilkProduction from "../Graphs/YearlyMilkProduction.jsx";
import Datecomponent from "../Date/Datecomponent.jsx";
import PendingRequests from "../BreadcrumbItems/Adminbreadcrumb/PendingRequests.jsx";

const { Content } = Layout;

const DashBoardAdmin = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [currentFarmers, setCurrentFarmers] = useState(0);
    const [milkCollectedThisMonth, setMilkCollectedThisMonth] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("decodedToken");
        if (token) {
            try {
                const decodedToken = JSON.parse(token);
                const userId = decodedToken.userId;

                // Fetch pending requests
                axios.get(`http://localhost:8080/api/association/pendingRequests/${userId}`)
                    .then(response => {
                        setPendingRequests(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error fetching pending requests!', error);
                    });

                // Fetch current farmers
                axios.get(`http://localhost:8080/api/association/userCount/${userId}`)
                    .then(response => {
                        setCurrentFarmers(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error fetching current farmers count!', error);
                    });

                // Fetch milk collected this month
                axios.get(`http://localhost:8080/api/association/farmsMonthlyProduction/${userId}`)
                    .then(response => {
                        const farms = response.data;
                        const totalMilkCollected = farms.reduce((sum, farm) => sum + farm.currentMonthTotal, 0);
                        setMilkCollectedThisMonth(totalMilkCollected);
                    })
                    .catch(error => {
                        console.error('There was an error fetching milk collected this month!', error);
                    });

            } catch (e) {
                console.error('Invalid token', e);
            }
        }
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

    const cardStyle = {
        height: '100%', // Set a fixed height for all cards in the row
    };

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
                <Col span={8}> {/* Each Col spans 8/24 or 1/3 of the row */}
                    <Card title="Number Of Registered Farmers" bordered={false} style={cardStyle}>
                        {currentFarmers} {/* Display current farmers count */}
                    </Card>
                </Col>
                <Col span={8}> {/* Each Col spans 8/24 or 1/3 of the row */}
                    <Card title="Milk Collected This Month" bordered={false} style={cardStyle}>
                        {milkCollectedThisMonth} Lt {/* Display milk collected this month */}
                    </Card>
                </Col>
                <Col span={8}> {/* Each Col spans 8/24 or 1/3 of the row */}
                    <Card title="Date" bordered={false} style={cardStyle}>
                        <Datecomponent/>
                    </Card>
                </Col>
            </Row>

            <Row className="equal-height" gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={16}>
                    <Card title="Annual Milk Production by Month" bordered={false}>
                        <div style={{ height: '25vw' }}> {/* Adjust this value as needed */}
                            <YearlyMilkProduction />
                        </div>
                    </Card>
                </Col>
                <Col span={8}>

                        <div style={{ height: '25vw' }}> {/* Adjust this value as needed */}
                            <PendingRequests showActions={false} />
                        </div>

                </Col>
            </Row>
        </Content>
    );
};

export default DashBoardAdmin;
