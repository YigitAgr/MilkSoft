import React, { useState } from 'react';
import axios from "axios";
import { Checkbox, Col, Form, Input, Row, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import '../Component/FormPages/LoginPage.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email: values.email,
                password: values.password
            });

            if (response.status === 200) {
                console.log('Success:', response.data);
                // Decode the token
                const decodedToken = decodeToken(response.data.token);
                // Store the decoded data in local storage
                localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            } else {
                console.log('Failed:', response.data);
                // Handle the error appropriately, such as showing an error message to the user
                // You might also want to clear any existing token from localStorage in case of failure
                localStorage.removeItem("token");
                // Additionally, you might want to reset the loading state if the login fails
                setLoading(false);
            }

        } catch (error) {
            console.log('Failed:', error);
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    return (
        <div className="login-page">
            <Row gutter={[16, 16]}>
                <Col className={"img"} style={{ paddingRight: '20px', height: '100vh' }} span={12}>
                </Col>
                <Col className={"form"} span={12} style={{ marginTop: '16.5%', width: '100vw' }}>
                    <h1 style={{ textAlign: 'start', color: 'black', marginLeft: '24.33%' }}>Login</h1>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600, backgroundColor: 'white'}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {type: 'email', message: 'Please enter a valid email!'},
                                {required: true, message: 'Please input your email!'}
                            ]}
                        >
                            <Input className="inputfield custom-input" style={{color: 'black'}}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password className="inputfield custom-input" style={{color: 'black'}}/>
                        </Form.Item>

                        <div className="login-actions" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                style={{marginBottom: 0, width: '150%'}} // Set width to 40%
                            >
                                <Checkbox className="custom-checkbox">Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item style={{marginBottom: 0, width: '30%'}}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="login-button"
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default LoginForm;
