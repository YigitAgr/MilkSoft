import React, { useState } from 'react';
import axios from "axios";
import { Checkbox, Col, Form, Input, Row, Button, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import '../../Component/FormPages/RegisterPage.css'; // Make sure you have a corresponding CSS file for RegisterPage

const RegisterForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('user'); // Set 'user' as the default form


    const showUserForm = () => {
        setFormType('user');
    };

    const showAdminForm = () => {
        setFormType('admin');
    };


    const onUserFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName
            });

            if (response.status === 200) {
                console.log('Success:', response.data);
                navigate("/login"); // Redirect to login page after successful registration
            } else {
                console.log('Failed:', response.data);
                setLoading(false);
            }

        } catch (error) {
            console.log('Failed:', error);
        }
        setLoading(false);
    };

    const onAdminFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/registerAdmin', {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName
            });

            if (response.status === 200) {
                console.log('Success:', response.data);
                navigate("/login"); // Redirect to login page after successful registration
            } else {
                console.log('Failed:', response.data);
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

    return (
        <div className="register-page">
            <Row gutter={[16, 16]}>
                <Col className={"img"} style={{ paddingRight: '20px', height: '100vh' }} span={12}>
                </Col>
                <Col className={"form"} span={12} style={{marginTop: '16.5%', width: '100vw'}}>
                    <h1 style={{textAlign: 'start', color: 'black', marginLeft: '24.33%'}}>Register</h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: '20px',
                        marginLeft: '20%'
                    }}>
                        <Button onClick={showUserForm}>Register as Farmer</Button>
                        <Button onClick={showAdminForm} style={{marginLeft: '10px'}}>Register as Assocition</Button>
                    </div>
                    {formType === 'user' && (
                        <Form
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600, backgroundColor: 'white'}}
                            initialValues={{remember: true}}
                            onFinish={onUserFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{required: true, message: 'Please input your first name!'}]}
                            >
                                <Input className="inputfield custom-input" style={{color: 'black'}}/>
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{required: true, message: 'Please input your last name!'}]}
                            >
                                <Input className="inputfield custom-input" style={{color: 'black'}}/>
                            </Form.Item>

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

                            <div className="register-actions" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Form.Item style={{marginBottom: 0}}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="register-button"
                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    )}
                    {formType === 'admin' && (
                        <Form
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600, backgroundColor: 'white'}}
                            initialValues={{remember: true}}
                            onFinish={onAdminFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{required: true, message: 'Please input your first name!'}]}
                            >
                                <Input className="inputfield custom-input" style={{color: 'black'}}/>
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{required: true, message: 'Please input your last name!'}]}
                            >
                                <Input className="inputfield custom-input" style={{color: 'black'}}/>
                            </Form.Item>

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

                            <div className="register-actions" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Form.Item style={{marginBottom: 0}}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="register-button"
                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default RegisterForm;