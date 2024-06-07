import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Table } from 'antd';
import MonthlyMilk from "../Graphs/MonthlyMilk.jsx";
import axios from "axios";

const { Content } = Layout;

const HomePageContentAdmin = () => {
    const [cowCount, setCowCount] = useState(null);
    const [cowsInCalf, setCowsInCalf] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const userId = decodedToken.userId;
                    const farmerResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { farmerId } = farmerResponse.data;

                    const farmResponse = await axios.get(`http://localhost:8080/api/farm/getFarmId/${farmerId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const fetchedFarmId = farmResponse.data;

                    const cowCountResponse = await axios.get(`http://localhost:8080/api/cow/count/${fetchedFarmId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setCowCount(cowCountResponse.data);

                    const cowsInCalfResponse = await axios.get(`http://localhost:8080/api/cow/cowincalf/${fetchedFarmId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setCowsInCalf(cowsInCalfResponse.data);
                } catch (error) {
                    console.error('Failed to fetch data: ', error);
                }
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Ear Tag',
            dataIndex: 'earTag',
            key: 'earTag',
        },
        {
            title: 'Breed',
            dataIndex: 'breed',
            key: 'breed',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birthDate',
            render: (text) => new Date(text).toLocaleDateString()
        }
    ];

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#f5f5f5',
                borderRadius: '20px',
            }}
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={6}>
                    <Card title="Cow count" bordered={false}>
                        {cowCount !== null ? cowCount : '0'}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Monthly Milk Production" bordered={false}>
                        100
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
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={16}>
                    <Card title="Trend" bordered={false}>
                        <MonthlyMilk/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Cow In Calf" bordered={false}>
                        <div style={{height: '25vw'}}>
                            <Table dataSource={cowsInCalf} columns={columns} pagination={false} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default HomePageContentAdmin;
