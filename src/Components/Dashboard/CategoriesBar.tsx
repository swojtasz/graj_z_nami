import styles from './CategoriesBar.module.css';
import { useEffect, useState } from 'react';
import { Typography, Select, Row, Col } from 'antd';
import { apiClient } from 'src/services/api/api';

const { Text } = Typography;
const { Option } = Select;

export interface SportCategories {
    id: number;
    name: string;
}

export const CategoriesBar: React.FC = () => {
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

    return (
        <Row className={styles.categoriesBar}>
            <Col span={22}>
                <Text className={styles.chooseSport}>Wybierz sport:</Text>

                <Select
                    defaultValue={
                        localStorage.getItem('selectedCategory') === null
                            ? 'Wszystkie'
                            : localStorage.getItem('selectedCategory')!
                    }
                    bordered={false}
                    onChange={(e) => {
                        localStorage.setItem('selectedCategory', e);
                        window.location.reload();
                    }}
                    className={styles.selectCategory}
                >
                    <Option key={0} value={'Wszystkie'}>
                        Wszystkie
                    </Option>
                    {sportCategories?.map((sport) => (
                        <Option key={sport.id} value={sport.name}>
                            {sport.name}
                        </Option>
                    ))}
                </Select>
            </Col>
            <Col span={2}>
                <Select
                    defaultValue="Wybierz miasto"
                    bordered={false}
                    onChange={(e) => {
                        localStorage.setItem('selectedCity', e);
                    }}
                    className={styles.selectCity}
                >
                    <Option value="all">Wszystkie</Option>
                    <Option value="wroclaw">Wrocław</Option>
                    <Option value="krakow">Kraków</Option>
                </Select>
            </Col>
        </Row>
    );
};
