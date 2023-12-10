import { type PropsWithChildren, useMemo } from 'react';

import { getCurrentUser } from '@services/idp';

import { UserContext } from './UserContext';

export const UserProvider = ({ children }: PropsWithChildren) => {
    const value = useMemo(() => ({ user: getCurrentUser() }), []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
