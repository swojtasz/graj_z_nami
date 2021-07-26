import { Link } from 'react-router-dom';
import { Typography, Space, Card } from 'antd';
const { Text, Title } = Typography;

interface user {
    firstName: string;
    lastName: string;
    email: string;
}

export type eventDetails = {
    id: number;
    sportId: number;
    sportName: string;
    name: string;
    description: string;
    place: string;
    date: Date;
    usersLimit: number;
    usersCount: number;
    users?: user[];
    status: number;
    isPublic: boolean;
    isFree: boolean;
    totalCost: number;
    organiserName: string;
};

export const getShortAddress = (address: string) => {
    const splittedAddress = address.split(',');
    const addressLength = splittedAddress.length;

    return splittedAddress[addressLength - 2] + splittedAddress[addressLength - 1];
};

export const Event: React.FC<eventDetails> = (data: eventDetails) => {
    return (
        <Link
            to={'/event/' + data.id}
            component={Typography.Link}
            onClick={() => {
                localStorage.setItem('eventId', data.id.toString());
            }}
        >
            <Card
                title={<Title level={4}>{data.organiserName}</Title>}
                extra={<Text type="secondary">{data.sportName}</Text>}
            >
                <Title level={3}>{data.name}</Title>
                <Space direction="horizontal">
                    <Text type="secondary">{getShortAddress(data.place)}</Text>
                    <Text type="secondary">/ {data.date.toString().split('T')[0]} </Text>
                    <Text>
                        / {data.usersCount}/{data.usersLimit} osób
                    </Text>
                </Space>
            </Card>
        </Link>
    );
};
