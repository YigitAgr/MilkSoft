import React, { useState, useEffect } from "react";
import { Card, Layout, Button, Spin, Typography } from "antd";
import AssociationFindModal from "../Modals/AssociationFindModal.jsx";
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;

const AssociationUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [association, setAssociation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [farmerId, setFarmerId] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const localToken = localStorage.getItem("token");
            if (localToken && localToken.split('.').length === 3) {
                try {
                    const decodedToken = JSON.parse(atob(localToken.split('.')[1]));
                    const userId = decodedToken.userId;
                    setToken(localToken);

                    const farmerResponse = await axios.get(`http://localhost:8080/api/farmer/${userId}`, {
                        headers: { Authorization: `Bearer ${localToken}` }
                    });
                    const farmerId = farmerResponse.data.farmerId;
                    setFarmerId(farmerId);

                    const associationResponse = await axios.get(`http://localhost:8080/api/farmer/associations/farmer/${farmerId}`, {
                        headers: { Authorization: `Bearer ${localToken}` }
                    });
                    setAssociation(associationResponse.data);

                    const reportResponse = await axios.get(`http://localhost:8080/api/reports/runpython`, {
                        headers: { Authorization: `Bearer ${localToken}` }
                    });
                    const reportText = reportResponse.data;
                    // Extracting the specific section from the report data
                    const startIndex = reportText.indexOf('In ');
                    const endIndex = reportText.indexOf('Breed produces the most milk');
                    const desiredSection = reportText.slice(startIndex, endIndex);
                    setReportData(desiredSection);

                    console.log("reportdata",reportData);

                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        console.log("reportData updated:", reportData);
    }, [reportData]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 500,
                background: '#f5f5f5',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <Card style={{ width: '100%', height: '38vw', position: 'relative' }}>
                    {association ? (
                        <div style={{ marginBottom: '20px' }}>
                            <Title level={3}>{association.name}</Title>
                            <Text type="secondary" style={{ fontSize: '18px' }}>{association.city}</Text>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', fontSize: '20px' }}>
                            <p>You are not registered in any associations.</p>
                        </div>
                    )}
                    {!association && (
                        <Button
                            type="primary"
                            onClick={showModal}
                            style={{ position: 'absolute', top: '10%', right: '5%' }}
                        >
                            Find Association
                        </Button>
                    )}
                    {reportData && (
                        <Card title="Report" size="small">
                            <ul>
                                {reportData.split(/(?<=\.\s)/).map((segment, index) => (
                                    <li key={index}>
                                        {segment.trim()}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}






                    <AssociationFindModal
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        farmerId={farmerId}
                    />
                </Card>
            )}
        </Content>
    );
};

export default AssociationUser;
