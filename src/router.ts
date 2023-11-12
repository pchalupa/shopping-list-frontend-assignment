import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@components/Layout';
import { DashboardPage } from '@pages/Dashboard';
import { DetailPage } from '@pages/Detail';
import { ErrorPage } from '@pages/Error';

export enum Route {
    Dashboard = '/',
    Detail = '/detail',
}

export const router = createBrowserRouter([
    {
        path: Route.Dashboard,
        Component: Layout,
        ErrorBoundary: ErrorPage,
        children: [
            { path: Route.Dashboard, Component: DashboardPage },
            { path: `${Route.Detail}/:id`, Component: DetailPage },
        ],
    },
]);
