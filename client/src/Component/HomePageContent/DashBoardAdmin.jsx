import React from 'react';
import { Layout, Row, Col, Card } from 'antd';

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
                    <Card title="Current MRR" bordered={false}>
                        $12.4k
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Current Farmers" bordered={false}>
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
                        {/* Insert Trend Chart Here */}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Sales" bordered={false}>
                        {/* Insert Sales Chart Here */}
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
