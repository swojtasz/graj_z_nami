import { DashboardPageHeader, pageHeaderProps } from 'src/Components/DashboardPageHeader';
import { AddEventContent } from 'src/Components/AddEvent';
import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const AddEventView: React.FC = () => {
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
                        Dodaj ogłoszenie
                    </Link>
                </Breadcrumb.Item>
            </>
        ),
        title: 'Dodaj ogłoszenie',
    };
    return (
        <>
            <DashboardPageHeader {...pageHeaderItems} />
            <AddEventContent />
        </>
    );
};
