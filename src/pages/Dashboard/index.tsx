import { useUserContext } from '@contexts/UserContext/useUserContext';

import styles from './index.module.css';
import { Item } from './parts/Item';
import { useDashboardData } from './useDashboardData';

export const DashboardPage = () => {
    const { user } = useUserContext();
    const { data, remove } = useDashboardData();

    return (
        <div className={styles.container}>
            {data?.map(({ id, name, owner, updatedAt }) => (
                <Item key={id} id={id} name={name} owner={owner} updatedAt={updatedAt} isOwner={user.id === owner.id} onRemoveClick={remove} />
            ))}
        </div>
    );
};
