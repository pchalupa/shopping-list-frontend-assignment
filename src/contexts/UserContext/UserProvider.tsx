import { type PropsWithChildren, useMemo } from 'react';

import { user } from '@services/api/index.mock';

import { UserContext } from './UserContext';

export const UserProvider = ({ children }: PropsWithChildren) => {
    const value = useMemo(() => ({ user: user.a }), []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
