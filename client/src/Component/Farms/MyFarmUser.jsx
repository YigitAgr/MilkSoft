import React, { useState } from "react";
import {Button, Card, Layout} from "antd";
import CreateFarmModal  from "../Modals/CreateFarmModal.jsx";

const { Content } = Layout;

const MyFarmUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            }}
        >
            <Card style={{height:'38vw'}} title="Farms" bordered={false}>
                <Button type="primary" style={{ float: 'right' }} onClick={showModal}>Create Farm</Button>
            </Card>
            <CreateFarmModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
        </Content>
    );
}

export default MyFarmUser;