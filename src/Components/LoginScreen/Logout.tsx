import { Button } from 'antd';
import { Redirect } from 'react-router';

export const Logout: React.FC = () => {
    const onLogout = () => {
        localStorage.clear();
        <Redirect to="/" />;
        window.location.reload();
    };

    return (
        <Button type="text" onClick={onLogout}>
            Logout
        </Button>
    );
};
