import styles from './PageHeader.module.css';
import { Breadcrumb, PageHeader, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

export type pageHeaderProps = {
    breadcrumbItems?: JSX.Element;
    title: string;
};

export const DashboardPageHeader: React.FC<pageHeaderProps> = (data: pageHeaderProps) => {
    return (
        <div className={styles.pageHeader}>
            <Breadcrumb className={styles.pageHeaderBreadcrumb}> {data.breadcrumbItems}</Breadcrumb>
            <PageHeader
                title={data.title}
                extra={[
                    <Button key="1">Zobacz gry do których dołączyłeś</Button>,
                    <Button key="2">Zobacz swoje ogłoszenia</Button>,
                    <Button key="3" type="primary">
                        <Link to="/addEvent" component={Typography.Link}>
                            Dodaj Ogłoszenie
                        </Link>
                    </Button>,
                ]}
            ></PageHeader>
        </div>
    );
};
