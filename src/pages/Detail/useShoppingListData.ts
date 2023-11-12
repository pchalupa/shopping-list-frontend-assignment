import { useUserContext } from 'contexts/UserContext/useUserContext';
import { useCallback, useEffect, useState } from 'react';

import { useErrorHandler } from '@hooks/useErrorHandler';
import * as Api from '@services/api';
import { type ShoppingList } from '@services/api';

export enum Role {
    Owner,
    Member,
    Unauthorized,
}

export const useShoppingListData = (listId: string) => {
    const [data, setData] = useState<ShoppingList | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const { handleError } = useErrorHandler();
    const { user } = useUserContext();

    const isOwner = data?.owner.id === user.id;
    const isMember = data?.members.some(({ id }) => id === user.id);

    const role = isOwner ? Role.Owner : isMember ? Role.Member : Role.Unauthorized;

    const needs = useCallback((roles: Role[]) => roles.includes(role), [role]);

    const fetch = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await Api.getShoppingList(listId);

            setData(result);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }, [listId, handleError]);

    const updateName = useCallback(
        async (name: string) => {
            try {
                const result = await Api.updateShoppingListName(listId, name);

                setData({ ...result });
            } catch (error) {
                handleError(error);
            }
        },
        [listId, handleError],
    );

    const remove = useCallback(async () => {
        try {
            await Api.removeShoppingList(listId);

            setData(undefined);
        } catch (error) {
            handleError(error);
        }
    }, [listId, handleError]);

    const archive = useCallback(async () => {
        try {
            const result = await Api.archiveShoppingList(listId);

            setData(result);
        } catch (error) {
            handleError(error);
        }
    }, [listId, handleError]);

    const addItem = useCallback(
        async (item: { name: string }) => {
            try {
                const result = await Api.addShoppingListItem(listId, item);

                setData({ ...result });
            } catch (error) {
                handleError(error);
            }
        },
        [listId, handleError],
    );

    const solveItem = useCallback(
        async (itemId: string) => {
            try {
                const result = await Api.solveShoppingListItem(listId, itemId);

                setData({ ...result });
            } catch (error) {
                handleError(error);
            }
        },
        [listId, handleError],
    );

    const removeItem = useCallback(
        async (itemId: string) => {
            try {
                const result = await Api.removeShoppingListItem(listId, itemId);

                setData({ ...result });
            } catch (error) {
                handleError(error);
            }
        },
        [listId, handleError],
    );

    const addMember = useCallback(
        async (member: { name: string }) => {
            try {
                const result = await Api.addShoppingListMember(listId, member);

                setData({ ...result });
            } catch (error) {
                handleError(error);
            }
        },
        [listId, handleError],
    );

    const removeMember = useCallback(
        async (memberId: string) => {
            try {
                const result = await Api.removeShoppingListMember(listId, memberId);

                setData({ ...result });
            } catch (error) {
                handleError(error);
            }
        },
        [listId, handleError],
    );

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { data, isLoading, updateName, remove, archive, addItem, solveItem, removeItem, addMember, removeMember, isOwner, isMember, needs };
};
