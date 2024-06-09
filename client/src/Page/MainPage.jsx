import React, {useState} from 'react';
import '../Component/MainPage/MainPage.css';
import { Col, Row, Space } from 'antd';
import ButtonLoading from '../Component/Button/ButtonLoading';

const MainPage = () => {
    return (
        <div className="main-page">
            <Row justify="center">
                <Col className="deneme" style={{marginTop: "10%"}} span={8}>
                    <h1>Welcome to Our Application</h1>
                    <p>We are a farm dedicated to providing high-quality, sustainable produce.</p>
                    <p>We're passionate about agriculture and dedicated to providing high-quality,
                        sustainable produce. Our mission is to leverage technology and innovation to enhance the
                        efficiency and productivity of cow farms, ultimately contributing to a more sustainable and
                        prosperous agricultural industry.</p>
                    <Space size={[30, 0]}>
                        <ButtonLoading buttonText="Log In"/>
                        <ButtonLoading buttonText="Sign Up"/>
                    </Space>
                </Col>
            </Row>


        </div>
    );
};

export default MainPage;