import { CategoriesBar, DashboardContent } from 'src/Components/Dashboard';
import { DashboardPageHeader, pageHeaderProps } from 'src/Components/DashboardPageHeader';
import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const DashboardView: React.FC = () => {
    const pageHeaderItems: pageHeaderProps = {
        breadcrumbItems: (
            <Breadcrumb.Item key="/">
                <Link to="/" component={Typography.Link}>
                    Strona główna
                </Link>
            </Breadcrumb.Item>
        ),
        title: 'Znajdź ludzi do meczu',
    };
    return (
        <>
            <DashboardPageHeader {...pageHeaderItems} />
            <CategoriesBar />
            <DashboardContent />
        </>
    );
};
