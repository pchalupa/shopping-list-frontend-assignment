import styles from './index.module.css';
import { Item } from './parts/Item';
import { useDashboardData } from './useDashboardData';

export const DashboardPage = () => {
    const { data, remove } = useDashboardData();

    return (
        <div className={styles.container}>
            {data?.map(({ id, name, owner, updatedAt }) => (
                <Item key={id} id={id} name={name} owner={owner} updatedAt={updatedAt} onRemoveClick={remove} />
            ))}
        </div>
    );
};
