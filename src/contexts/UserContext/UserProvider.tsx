import { type PropsWithChildren, useMemo } from 'react';

import { UserContext } from './UserContext';

export const UserProvider = ({ children }: PropsWithChildren) => {
    const value = useMemo(() => ({ user: { id: 'a', name: 'Petr Novák' } }), []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
