import styles from './GeneralInformation.module.css';
import { Typography, Row, Col, Card, Input, Select, InputNumber, DatePicker, Checkbox, Form, Button } from 'antd';
import { SportCategories } from '../Dashboard/CategoriesBar';
import { Map } from '../GoogleMap';
import FormItem from 'antd/lib/form/FormItem';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/services/api/api';
import { Redirect } from 'react-router-dom';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

export const GeneralInformation: React.FC = () => {
    interface addEventValues {
        sportId: number;
        title: string;
        description: string;
        place: string;
        date: Date;
        usersLimit: number;
        status: number;
        isPublic: boolean;
        isFree: boolean;
        totalCost: number;
    }

    const [sportCategories, setSportCategories] = useState<SportCategories[]>();
    const [finished, setFinished] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiClient.get<SportCategories[]>('/api/Sports');
                setSportCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    const onFinish = (values: addEventValues) => {
        apiClient
            .post('/api/events', {
                sportId: values.sportId,
                name: values.title,
                description: values.description,
                place: address,
                date: values.date,
                usersLimit: values.usersLimit,
                status: 0,
                isPublic: values.isPublic,
                isFree: values.isFree,
                totalCost: values.isFree ? 0 : 10,
            })
            .then(
                (response) => {
                    if (response.status === 204 || response.status === 200) {
                        setFinished(true);
                    }
                    if (response.status === 401) {
                        localStorage.clear();
                        setTokenExpired(true);
                    }
                },
                (error) => {
                    console.log(error);
                },
            );
    };

    const [address, setAddress] = useState('');

    return (
        <div className={styles.generalInformation}>
            {finished && <Redirect to="/" />}
            {tokenExpired && <Redirect to="/login" />}
            <Form onFinish={onFinish}>
                <Card
                    title={<Title level={5}>Ogólne informacje</Title>}
                    extra={
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Dodaj Wydarzenie
                            </Button>
                        </Form.Item>
                    }
                >
                    <Row gutter={[16, 12]}>
                        <Col span={6}> Tytuł ogłoszenia </Col>
                        <Col span={6}> Dyscyplina sportu </Col>
                        <Col span={6}> Liczba osób </Col>
                        <Col span={6}> Data meczu </Col>
                        <Col span={6}>
                            <FormItem name="title" rules={[{ required: true, message: 'Podaj tytuł!' }]}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem name="sportId" rules={[{ required: true, message: 'Podaj kategorię!' }]}>
                                <Select defaultValue="Wybierz sport" className={styles.selectCategory}>
                                    {sportCategories?.map((sport) => (
                                        <Option key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem name="usersLimit" rules={[{ required: true, message: 'Wprowadź liczbę osób!' }]}>
                                <InputNumber min={2} max={100} className={styles.inputNumber} />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem name="date" rules={[{ required: true, message: 'Wprowadź datę!' }]}>
                                <DatePicker placeholder="Wybierz datę" className={styles.date} />
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem name="description">
                        <TextArea rows={4} placeholder={'Wprowadź opis...'} className={styles.textArea} />
                    </FormItem>

                    <FormItem name="isPrivate" valuePropName="checked">
                        <Checkbox>Czy wydarzenie jest prywatne?</Checkbox>
                    </FormItem>

                    <FormItem name="isFree" valuePropName="checked">
                        <Checkbox>Czy wydarzenie jest darmowe?</Checkbox>
                    </FormItem>
                </Card>
                <Card
                    title={<Title level={5}>Lokalizacja</Title>}
                    extra={<Text>Wpisz adres, wyszukaj go, a następnie dostosuj pinezkę na mapie</Text>}
                >
                    <Map handleGetAddress={(e: string) => setAddress(e)} />
                </Card>
            </Form>
        </div>
    );
};
