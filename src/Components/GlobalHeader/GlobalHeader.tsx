import styles from './GlobalHeader.module.css';
import { isTokenActive, Logout } from '../LoginScreen';
import { Link } from 'react-router-dom';
import { PageHeader, Typography } from 'antd';

export const GlobalHeader: React.FC = () => {
    if (isTokenActive()) {
        return (
            <div className={styles.globalHeader}>
                <PageHeader className={styles.antPageHeader} title="Grajznami" extra={<Logout />}></PageHeader>
            </div>
        );
    }

    return (
        <div className={styles.globalHeader}>
            <PageHeader
                className={styles.antPageHeader}
                title="Grajznami"
                extra={[
                    <Link to="/login" component={Typography.Link} key="1" style={{ color: 'black' }}>
                        Log-in
                    </Link>,
                    <Link to="/register" component={Typography.Link} key="2" style={{ color: 'black' }}>
                        Register
                    </Link>,
                ]}
            ></PageHeader>
        </div>
    );
};
