import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import YearlyMilkProduction from "../Graphs/YearlyMilkProduction.jsx";

const { Content } = Layout;

const DashBoardAdmin = () => {
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
                    <Card title="Current Farmers" bordered={false}>
                        $12.4k
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Milk Sales Per Month" bordered={false}>
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
                            {/* Placeholder content */}
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
