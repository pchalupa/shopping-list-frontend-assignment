import { Outlet } from 'react-router-dom';

import { Header } from './parts/Header';
import styles from './styles.module.css';

export const Layout = () => (
    <div className={styles.container}>
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
);
