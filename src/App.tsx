import { UserProvider } from 'contexts/UserContext/UserProvider';
import { RouterProvider } from 'react-router-dom';

import { ToastProvider } from '@contexts/ToastContext/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { router } from './router';

const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <ToastProvider>
                <RouterProvider router={router} />
            </ToastProvider>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
