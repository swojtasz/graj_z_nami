import styles from './LoginForm.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { apiClient } from 'src/services/api/api';
import { useState } from 'react';

const { Title } = Typography;

export const isTokenActive = () => {
    return localStorage.getItem('token') ? true : false;
};

export const LoginForm: React.FC = () => {
    interface loginCredentials {
        email: string;
        password: string;
    }

    const [finished, setFinished] = useState(false);

    const onFinish = (values: loginCredentials) => {
        apiClient
            .post('/api/user/login', {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.jwtToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    localStorage.setItem('userEmail', values.email.toLocaleLowerCase());
                    setFinished(true);
                }
            });
    };

    return (
        <div className={styles.loginForm}>
            {finished && <Redirect to="/" />}
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Form initialValues={{ remember: true }} onFinish={onFinish} className={styles.antForm}>
                    <Title level={3}>Please login</Title>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your E-Mail!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="E-mail" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link to="/" component={Typography.Link} className={styles.loginFormForgot}>
                            Forgot password
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                            Log in
                        </Button>
                        Or{' '}
                        <Link to="/register" component={Typography.Link}>
                            register now!
                        </Link>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    );
};
