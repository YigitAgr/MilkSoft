import React from "react";
import {Card, Layout, Input} from "antd";

const { Content } = Layout;

const AssociationUser = () => {

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 500,
                background: '#f5f5f5', // You can customize the background color
                borderRadius: '20px', // You can customize the border radius
            }}
        >
            <Card style={{ width: '100%', height: '104%' }}>
                <Input.Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ marginTop:'3%', width: '20%',height:'20%' }}
                />
            </Card>
        </Content>
    );
}

export default AssociationUser;