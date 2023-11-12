import { useUserContext } from 'contexts/UserContext/useUserContext';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.css';

export const Layout = () => {
    const { user } = useUserContext();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span>{user.name}</span>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
