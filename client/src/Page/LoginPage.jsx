import React from 'react';
import { Checkbox, Col, Form, Input, Row} from 'antd';
import {useNavigate} from "react-router-dom";
import ButtonLoading from "../Component/Button/ButtonLoading.jsx";
import '../Component/FormPages/LoginPage.css';

const LoginForm = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        navigate("/home");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page" >
            <Row gutter={[16,16]}  >
                <Col className={"img"} style={{paddingRight:'20px', height:'100vh'}} span={12}>
                </Col>
                <Col className={"form"} span={12} style={{marginTop:'16.5%',width:'100vw' }} >
                    <h1 style={{textAlign:'start',color:'black',marginLeft:'24.33%'}}>Login</h1>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input className={"inputfield"} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password  className={"inputfield"}/>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <div className="login-actions">
                                <Checkbox>Remember me</Checkbox>
                                <ButtonLoading
                                    id="login-button"
                                    className="login-button"
                                    buttonText="Login"
                                    onClick={onFinish()}/>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginForm;