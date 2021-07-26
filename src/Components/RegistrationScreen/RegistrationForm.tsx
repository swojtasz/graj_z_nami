import styles from './RegistrationForm.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Row, Checkbox, Button, Typography, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { apiClient } from 'src/services/api/api';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm();

    interface registerCredentials {
        name: string;
        surname: string;
        email: string;
        password: string;
        confirm: string;
        phone: number;
        date: Moment;
    }

    const [finished, setFinished] = useState(false);

    const onFinish = (values: registerCredentials) => {
        apiClient
            .post('/api/user/register', {
                firstName: values.name,
                lastName: values.surname,
                password: values.password,
                confirmedPassword: values.confirm,
                email: values.email,
                phoneNumber: values.phone,
                description: ' ',
                dateOfBirth: values.date,
            })
            .then(
                (response) => {
                    if (response.status === 200) {
                        setFinished(true);
                    }
                },
                (error) => {
                    console.log(error);
                    // TODO wyprintuj czy np haslo zle, czy email juz jest zalogowany?
                },
            );
    };

    const [date, setDate] = useState(moment('0000-00-00', 'YYYY-MM-DD'));

    const handleDateChange = (date: Moment | null) => {
        if (date != null) {
            setDate(date);
        }
    };

    return (
        <div className={styles.registrationForm}>
            {finished && <Redirect to="/" />}
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    className={styles.antForm}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Surname"
                        rules={[{ required: true, message: 'Please input your surname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="date"
                        label="Date of birth"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <DatePicker onChange={handleDateChange} placeholder="Wybierz datę" className={styles.date} />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the{' '}
                            <Link to="/agreement" component={Typography.Link}>
                                agreement
                            </Link>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    );
};
