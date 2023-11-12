import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Card } from '@components/Card';

import styles from './index.module.css';
import { useDashboardData } from './useDashboardData';

export const DashboardPage = () => {
    const { data } = useDashboardData();
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            {data?.map(({ id, name, owner }) => (
                <Link key={id} to={`/detail/${id}`}>
                    <Card>
                        <p>{name}</p>
                        <p>
                            {t('owner')}: {owner.name}
                        </p>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
