import { UserProvider } from 'contexts/UserContext/UserProvider';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { router } from './router';

const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
