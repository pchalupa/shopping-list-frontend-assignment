import { useCallback } from 'react';

export const useErrorHandler = () => {
    const handleError = useCallback((error: unknown) => {
        if (error instanceof Error) console.error(error.message);
    }, []);

    return { handleError };
};
