import styles from './EventDescription.module.css';
import { Typography, Card } from 'antd';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/services/api/api';
import { eventDetails, getShortAddress, SportCategories } from '../Dashboard';
const { Title } = Typography;

export const EventDescription: React.FC<eventDetails> = (event: eventDetails) => {
    const [sportCategories, setSportCategories] = useState<SportCategories[]>();

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

    const selectCategory = () => {
        let category = '';
        sportCategories?.map((val) => {
            if (val.id === event.sportId) {
                category = val.name;
            }
        });
        return category;
    };

    return (
        <div>
            <Card
                title={<Title level={2}>{event.name}</Title>}
                extra={<Title level={4}>{selectCategory()}</Title>}
                style={{ minHeight: '40vh', marginRight: '0.5%' }}
            >
                <Title level={4}>Opis wydarzenia:</Title>
                <Title level={5}>{event.description}</Title>
                <div className={styles.city}>
                    <Title level={3}>Miasto: {getShortAddress(event.place)}</Title>
                    <Title level={4}>Data: {event.date.toString().split('T')[0]}</Title>
                </div>
            </Card>
        </div>
    );
};
