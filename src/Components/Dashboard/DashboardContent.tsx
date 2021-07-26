import styles from './DashboardContent.module.css';
import { Spin, List } from 'antd';
import { Event, eventDetails } from './Event';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/services/api/api';

export const DashboardContent: React.FC = () => {
    const [data, setData] = useState<eventDetails[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const responseEvent = await apiClient.get<eventDetails[]>('/api/Events');
                setData(responseEvent.data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    if (data.length > 0) {
        return (
            <div className={styles.content}>
                <List
                    grid={{ gutter: 12, column: 4 }}
                    pagination={{ pageSize: 12 }}
                    dataSource={data.filter((val) => {
                        if (
                            localStorage.getItem('selectedCategory') === 'Wszystkie' ||
                            localStorage.getItem('selectedCategory') === null
                        ) {
                            return val;
                        }
                        return val.sportName === localStorage.getItem('selectedCategory');
                    })}
                    renderItem={(item) => (
                        <List.Item>
                            <Event {...item} />
                        </List.Item>
                    )}
                />
            </div>
        );
    } else {
        return <Spin className={styles.loading} />;
    }
};
