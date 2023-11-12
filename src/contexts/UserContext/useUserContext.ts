import { useContext } from 'react';

import { UserContext } from './UserContext';

export const useUserContext = () => {
    const value = useContext(UserContext);

    if (!value) throw new Error('Use useUserContext hook within UserProvider.');

    return value;
};
