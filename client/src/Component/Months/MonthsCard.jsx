import React, { useState } from "react";
import { Card, Layout, Row, Col, Statistic, Empty } from "antd";
import { ThermometerOutlined, CloudOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MonthsModal from "../Modals/MonthsModal.jsx";

const { Content } = Layout;

const cardStyle = {
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '10px',
    marginBottom: '30px',
    marginTop: '40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    background: '#fff'
};

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 500,
    background: '#f5f5f5',
    borderRadius: '20px',
};

const cardHeaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold'
};

const MonthsCard = ({ currentPage, itemsPerPage, months, temperatureRecords }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [loading, setLoading] = useState(false);

    const showModal = (month) => {
        setSelectedMonth(month);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMonths = months.slice(startIndex, endIndex);

    // Extract temperature records from the object
    const selectedMonthRecords = selectedMonth ? temperatureRecords[selectedMonth] : [];

    return (
        <Content style={contentStyle}>
            <Row gutter={[16, 16]}>
                {currentMonths.map(month => (
                    <Col span={8} key={month}>
                        <Card
                            hoverable
                            style={cardStyle}
                            onClick={() => showModal(month)} // Add onClick event to show modal
                        >
                            <div style={cardHeaderStyle}>{month}</div>
                            {temperatureRecords[month] && temperatureRecords[month].length > 0 ? (
                                <>
                                    <ResponsiveContainer width="100%" height={100}>
                                        <LineChart data={temperatureRecords[month]}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                                            <Line type="monotone" dataKey="averageWet" stroke="#82ca9d" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '16px' }}>
                                        <Statistic
                                            title={<ThermometerOutlined />}
                                            value={temperatureRecords[month][0].temperature}
                                            suffix="°C"
                                        />
                                        <Statistic
                                            title={<CloudOutlined />}
                                            value={temperatureRecords[month][0].averageWet}
                                            suffix="%"
                                        />
                                    </div>
                                </>
                            ) : (
                                <Empty description="No Data" />
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedMonth && (
                <MonthsModal
                    visible={isModalVisible}
                    loading={loading}
                    temperatureRecords={selectedMonthRecords}
                    month={selectedMonth}
                    onClose={handleCancel}
                />
            )}
        </Content>
    );
};

export default MonthsCard;
