import { List } from './parts/List';
import { useDashboardData } from './useDashboardData';

export const DashboardPage = () => {
    const { data, remove } = useDashboardData();

    return (
        <div>
            <List items={data} onItemRemove={remove} />
        </div>
    );
};
