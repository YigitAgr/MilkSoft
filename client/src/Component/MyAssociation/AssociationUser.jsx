import React, { useState } from "react";
import {Card, Layout, Button} from "antd";
import AssociationFindModal from "../Modals/AssociationFindModal.jsx";

const { Content } = Layout;

const AssociationUser = () => {
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
            <Card style={{ width: '100%', height: '104%', position: 'relative' }}>
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{ position: 'absolute', top: '10%', right: '5%'}}
                >
                    Find Association
                </Button>
                <AssociationFindModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </Card>
        </Content>
    );
}

export default AssociationUser;