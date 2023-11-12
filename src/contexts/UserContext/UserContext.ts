import { createContext } from 'react';

interface IUserContext {
    user: { id: string; name: string };
}

export const UserContext = createContext<IUserContext | undefined>(undefined);
