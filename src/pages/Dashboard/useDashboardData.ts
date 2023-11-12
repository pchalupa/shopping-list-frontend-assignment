import { useCallback, useEffect, useState } from 'react';

import { useUserContext } from '@contexts/UserContext/useUserContext';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { type ShoppingList, getShoppingLists } from '@services/api';

export const useDashboardData = () => {
    const [data, setData] = useState<ShoppingList[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const { handleError } = useErrorHandler();
    const { user } = useUserContext();

    const fetch = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await getShoppingLists(user.id);

            setData(result);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [handleError, user]);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { data, isLoading };
};
