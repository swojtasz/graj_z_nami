import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

export const NotFound: React.FC = () => {
    return (
        <>
            <Title level={3}>Sorry</Title>
            <Title level={5}>That page cannot be found</Title>
            <Link to="/" component={Typography.Link}>
                Back to the homepage...
            </Link>
        </>
    );
};
