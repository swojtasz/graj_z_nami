import styles from './EventDetailsContent.module.css';
import { Row, Col, Spin, Breadcrumb, Typography } from 'antd';
import { EventDescription } from './EventDescription';
import { EventDetails } from './EventDetails';
import { EventMap } from './EventMap';
import { useEffect, useState } from 'react';
import { eventDetails } from '../Dashboard';
import { apiClient } from 'src/services/api/api';
import { DashboardPageHeader, pageHeaderProps } from '../DashboardPageHeader';
import { Link } from 'react-router-dom';

export const EventDetailsContent = () => {
    const [data, setData] = useState<eventDetails>();
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiClient.get<eventDetails>('/api/Events/' + localStorage.getItem('eventId'));
                setData(response.data);
                setTitle(response.data.organiserName + ' szuka ludzi do wspólnego grania');
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    const pageHeaderItems: pageHeaderProps = {
        breadcrumbItems: (
            <>
                <Breadcrumb.Item key="/">
                    <Link to="/" component={Typography.Link}>
                        Strona główna
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item key="/addEvent">
                    <Link to="/addEvent" component={Typography.Link}>
                        Ogłoszenie
                    </Link>
                </Breadcrumb.Item>
            </>
        ),
        title: title,
    };

    if (data) {
        return (
            <>
                <DashboardPageHeader {...pageHeaderItems} />
                <Row className={styles.event}>
                    <Col span={12}>
                        <EventDescription {...data!} />
                        <EventDetails {...data!} />
                    </Col>

                    <Col span={12}>
                        <EventMap {...data!} />
                    </Col>
                </Row>
            </>
        );
    } else {
        return <Spin />;
    }
};
