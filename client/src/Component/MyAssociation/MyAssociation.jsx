// MyAssociation.jsx
import React, { useState, useEffect } from "react";
import {Card, Layout, Breadcrumb} from "antd";
import PendingRequests from '../BreadcrumbItems/Adminbreadcrumb/PendingRequests.jsx'; // import the PendingRequests component

const { Content } = Layout;

const MyAssociation = () => {
    const initialItem = localStorage.getItem("selectedItem") || "Home";
    const [selectedItem, setSelectedItem] = useState(initialItem);

    const handleClick = (item) => {
        setSelectedItem(item);
        localStorage.setItem("selectedItem", item);
    };

    // Clear the selected item from local storage when the component unmounts
    useEffect(() => {
        return () => {
            localStorage.removeItem("selectedItem");
        };
    }, []);

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
                <Breadcrumb.Item style={{ fontWeight: selectedItem === "Home" ? "bold" : "normal" }} onClick={() => handleClick("Home")}>Home</Breadcrumb.Item>
                <Breadcrumb.Item style={{ fontWeight: selectedItem === "My Association" ? "bold" : "normal" }} onClick={() => handleClick("My Association")}>My Association</Breadcrumb.Item>
                <Breadcrumb.Item style={{ fontWeight: selectedItem === "Pending Requests" ? "bold" : "normal" }} onClick={() => handleClick("Pending Requests")}>Pending Requests</Breadcrumb.Item>
            </Breadcrumb>
            {selectedItem === "Home" && <Card title={"Home Content"}></Card>}
            {selectedItem === "My Association" && <Card title={"My Association Content"}></Card>}
            {selectedItem === "Pending Requests" && <PendingRequests />} {/* use the PendingRequests component */}
        </Content>
    );
}

export default MyAssociation;