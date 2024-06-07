// MyAssociation.jsx
import React, { useState, useEffect } from "react";
import { Card, Layout, Tabs } from "antd";
import PendingRequests from '../BreadcrumbItems/Adminbreadcrumb/PendingRequests.jsx';
import MyAssociationTab from "../BreadcrumbItems/Adminbreadcrumb/MyAssociationTab.jsx";

const { Content } = Layout;
const { TabPane } = Tabs;

const MyAssociation = () => {
    const initialItem = localStorage.getItem("selectedTab") || "1";
    const [selectedTab, setSelectedTab] = useState(initialItem);

    const handleTabChange = (key) => {
        console.log("Selected tab:", key);
        setSelectedTab(key);
        localStorage.setItem("selectedTab", key);
    };

    useEffect(() => {
        return () => {
            localStorage.removeItem("selectedTab");
        };
    }, []);

    useEffect(() => {
        console.log("Selected tab updated:", selectedTab);
    }, [selectedTab]);

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
            <Tabs activeKey={selectedTab} onChange={handleTabChange}>
                <TabPane tab="My Association" key="1">
                        <MyAssociationTab/>
                </TabPane>
                <TabPane tab="Csv" key="2">
                    <Card title={"Csv"}></Card>
                </TabPane>
                <TabPane tab="Pending Requests" key="3">
                    <PendingRequests />
                </TabPane>
            </Tabs>
        </Content>
    );
}

export default MyAssociation;