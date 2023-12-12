import { type PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';

import { ToastContext } from './ToastContext';
import { TIMEOUT } from './ToastProvider.preset';
import { Toast } from './parts/Toast';

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const dismiss = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            setIsVisible(false);
        }
    }, []);

    const toast = useCallback(
        (message: string, timeout = TIMEOUT) => {
            setMessage(message);
            setIsVisible(true);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                dismiss();
            }, timeout);
        },
        [dismiss],
    );

    const value = useMemo(() => ({ toast }), [toast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toast message={message} visible={isVisible} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
};
