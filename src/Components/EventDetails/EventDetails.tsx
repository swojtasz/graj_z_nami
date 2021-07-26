import styles from './EventDetails.module.css';
import { Typography, Progress, Button, Card, Space } from 'antd';
import { eventDetails } from '../Dashboard';
import { apiClient } from 'src/services/api/api';
import { useState } from 'react';
const { Title } = Typography;

export const EventDetails: React.FC<eventDetails> = (event: eventDetails) => {
    const isJoinedHandler = () => {
        if (event.users!.map((user) => user.email).includes(localStorage.getItem('userEmail')!)) {
            return true;
        }
        return false;
    };

    const [isJoined, setIsJoined] = useState(isJoinedHandler());

    const calculatePercent = (percent: number) => {
        const newPercent = percent / event.usersLimit;
        return newPercent * 100;
    };

    const onCancel = () => {
        apiClient.delete('/api/user/' + localStorage.getItem('eventId'));
        setIsJoined(false);
    };

    const onJoin = () => {
        apiClient.post('/api/user/' + localStorage.getItem('eventId'));
        setIsJoined(true);
    };

    if (isJoined) {
        return (
            <Card
                title={<Title level={4}>Zagraj z {event.organiserName}</Title>}
                extra={
                    <Button danger onClick={onCancel}>
                        {' '}
                        Anuluj swój udział{' '}
                    </Button>
                }
                style={{ minHeight: '40vh', marginRight: '0.5%' }}
            >
                <Title level={3}>Właśnie dołączyłeś do listy!</Title>
                <Title level={5}>
                    Poniżej znajdziesz wszystkie informacje, aby rozegrać spotkanie. Baw się dobrze!
                </Title>
                <Title level={3} className={styles.contactDetails} style={{ marginTop: '3%' }}>
                    Dane Kontaktowe
                </Title>
                <Title level={4}>{event.place}</Title>
                <Title level={4}>{123123123}</Title>
            </Card>
        );
    } else {
        return (
            <Card
                title={<Title level={4}>Zagraj z {event.organiserName}</Title>}
                style={{ textAlign: 'center', minHeight: '40vh', marginRight: '0.5%' }}
            >
                <Space direction="vertical">
                    <Progress
                        type="circle"
                        percent={calculatePercent(event.usersCount)}
                        format={(percent) => `${event.usersCount} / ${event.usersLimit}`}
                    />
                    <Button key="1" type="primary" name="join" onClick={onJoin}>
                        Dołącz do listy
                    </Button>
                </Space>
            </Card>
        );
    }
};
