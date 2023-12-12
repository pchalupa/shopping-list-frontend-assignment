import { useContext } from 'react';

import { ToastContext } from './ToastContext';

export const useToastContext = () => {
    const value = useContext(ToastContext);

    if (!value) throw new Error('Use useToastContext hook within ToastProvider.');

    return value;
};
