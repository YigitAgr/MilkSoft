import React, {useState} from 'react';
import '../Component/MainPage/MainPage.css';
import { Col, Row, Space } from 'antd';
import ButtonLoading from '../Component/Button/ButtonLoading';

const MainPage = () => {
    return (
        <div className="main-page">
            <Row justify="center">
                <Col className="deneme" style={{marginTop:"10%"}} span={8} >
                    <h1>Welcome to Our Farm</h1>
                    <p>We are a farm dedicated to providing high-quality, sustainable produce.</p>

                    <h2>Our Associations</h2>
                    <p>We are proud members of the following farm-related associations:</p>
                    <ul>
                        <li>Association 1</li>
                        <li>Association 2</li>
                        <li>Association 3</li>
                        // Add more associations as needed
                    </ul>
                    <Space size={[30,0]}>
                        <ButtonLoading buttonText="Log In"  />
                        <ButtonLoading buttonText="Sign Up" />
                    </Space>
                </Col>
            </Row>


        </div>
    );
};

export default MainPage;