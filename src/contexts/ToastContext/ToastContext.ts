import { createContext } from 'react';

interface IToast {
    toast: (message: string) => void;
}

export const ToastContext = createContext<IToast | undefined>(undefined);
