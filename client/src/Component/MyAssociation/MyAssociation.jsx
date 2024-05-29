// MyAssociation.jsx
import React, { useState } from "react";
import {Card, Layout, Breadcrumb} from "antd";
import PendingRequests from '../BreadcrumbItems/Adminbreadcrumb/PendingRequests.jsx'; // import the PendingRequests component

const { Content } = Layout;

const MyAssociation = () => {
    const [selectedItem, setSelectedItem] = useState("Home");

    const handleClick = (item) => {
        setSelectedItem(item);
    };

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
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => handleClick("Home")}>Home</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => handleClick("My Association")}>My Association</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => handleClick("Pending Requests")}>Pending Requests</Breadcrumb.Item>
            </Breadcrumb>
            {selectedItem === "Home" && <Card title={"Home Content"}></Card>}
            {selectedItem === "My Association" && <Card title={"My Association Content"}></Card>}
            {selectedItem === "Pending Requests" && <PendingRequests />} {/* use the PendingRequests component */}
        </Content>
    );
}

export default MyAssociation;