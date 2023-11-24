import { useCallback, useEffect, useState } from 'react';

import { useUserContext } from '@contexts/UserContext/useUserContext';
import { useErrorHandler } from '@hooks/useErrorHandler';
import * as Api from '@services/api';
import { type ShoppingList } from '@services/api';

export const useDashboardData = () => {
    const [data, setData] = useState<ShoppingList[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const { handleError } = useErrorHandler();
    const { user } = useUserContext();

    const fetch = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await Api.getShoppingLists(user.id);

            setData(result);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [handleError, user]);

    const add = useCallback(
        async (data: { name: string }) => {
            try {
                const result = await Api.addShoppingList({ name: data.name, owner: user });
                await fetch();

                return result;
            } catch (error) {
                handleError(error);
            }
        },
        [user, fetch, handleError],
    );

    const remove = useCallback(
        async (listId: string) => {
            try {
                await Api.removeShoppingList(listId);
                await fetch();
            } catch (error) {
                handleError(error);
            }
        },
        [handleError, fetch],
    );

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { data, isLoading, add, remove };
};
