import { UserProvider } from 'contexts/UserContext/UserProvider';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export const App = () => (
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
);
