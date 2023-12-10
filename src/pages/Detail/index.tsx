import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Route } from 'router';

import { Button } from '@components/Button';
import { Dialog as DeleteDialog } from '@components/Dialog';
import { useDialog } from '@components/Dialog/useDialog';
import { Loader } from '@components/Loader';
import { Text } from '@components/Text';
import { useUserContext } from '@contexts/UserContext/useUserContext';
import { useErrorHandler } from '@hooks/useErrorHandler';
import * as Api from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Header } from './parts/Header';
import { List } from './parts/List';
import { Metadata } from './parts/Metadata';
import styles from './styles.module.css';

export const DetailPage = () => {
    const { id = '' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { handleError } = useErrorHandler();
    const { user } = useUserContext();
    const { data, isLoading } = useQuery({
        queryKey: ['shoppingList', id],
        queryFn: async () => Api.getShoppingList(id),
        initialData: () => queryClient.getQueryData<Api.ShoppingList[]>(['shoppingLists'])?.find((item) => item.id === id),
    });
    const { mutateAsync: updateName } = useMutation<Api.ShoppingList, Error, string>({
        mutationKey: ['shoppingList', id],
        mutationFn: async (name) => Api.updateShoppingListName(id, name),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const { mutateAsync: archiveShoppingList } = useMutation({
        mutationKey: ['shoppingList', id],
        mutationFn: async () => Api.archiveShoppingList(id),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const { mutateAsync: removeShoppingList, isPending: isRemovingShoppingList } = useMutation<void, Error, string>({
        mutationKey: ['shoppingList'],
        mutationFn: async (data) => Api.removeShoppingList(data),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (_data, variables) => queryClient.removeQueries({ queryKey: ['shoppingList', variables], exact: true }),
        onError: handleError,
    });
    const { mutateAsync: addItem, isPending: isAddingItem } = useMutation<Api.ShoppingList, Error, { name: string }>({
        mutationKey: ['shoppingList', id],
        mutationFn: async (data) => Api.addShoppingListItem(id, data),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const { mutateAsync: solveItem, isPending: isSolvingItem } = useMutation<Api.ShoppingList, Error, string>({
        mutationKey: ['shoppingList', id],
        mutationFn: async (itemId) => Api.solveShoppingListItem(id, itemId),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const { mutateAsync: removeItem, isPending: isRemovingItem } = useMutation<Api.ShoppingList, Error, string>({
        mutationKey: ['shoppingList', id],
        mutationFn: async (itemId) => Api.removeShoppingListItem(id, itemId),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const { mutateAsync: addMember, isPending: isAddingMember } = useMutation<Api.ShoppingList, Error, { name: string }>({
        mutationKey: ['shoppingList', id],
        mutationFn: async (name) => Api.addShoppingListMember(id, name),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const { mutateAsync: removeMember, isPending: isRemovingMember } = useMutation<Api.ShoppingList, Error, string>({
        mutationKey: ['shoppingList', id],
        mutationFn: async (memberId) => Api.removeShoppingListMember(id, memberId),
        onSettled: async () => queryClient.invalidateQueries({ queryKey: ['shoppingLists'] }),
        onSuccess: async (data) => queryClient.setQueryData(['shoppingList', data.id], data),
        onError: handleError,
    });
    const isOwner = data?.owner.id === user.id;
    const isMember = data?.members.some(({ id }) => id === user.id);

    const { dialogRef: deleteDialogRef, prompt: promptToDelete } = useDialog({
        async onConfirmAsync() {
            await removeShoppingList(id);
            navigate(Route.Dashboard);
        },
    });

    const handleArchiveClick = useCallback(async () => {
        await archiveShoppingList();

        navigate('/');
    }, [archiveShoppingList, navigate]);

    useEffect(() => {
        if (!isLoading && !data) navigate(Route.Dashboard);
        if (!isMember && !isOwner) navigate(Route.Dashboard);
    }, [data, isLoading, isOwner, isMember, navigate]);

    if (isLoading) return <Loader className={styles.loader} />;

    return (
        <div className={styles.container}>
            <Header
                name={data?.name}
                isOwner={isOwner}
                isArchived={Boolean(data?.archivedAt)}
                onArchiveClick={handleArchiveClick}
                onDeleteClick={promptToDelete}
                onNameChange={updateName}
            />
            <div className={styles.wrapper}>
                <List
                    items={data?.items}
                    isLoading={isAddingItem || isSolvingItem || isRemovingItem}
                    onItemClick={solveItem}
                    onItemAdd={addItem}
                    onItemDeleteClick={removeItem}
                />
                <Metadata
                    owner={data?.owner?.name}
                    members={data?.members}
                    isOwner={isOwner}
                    isLoading={isAddingMember || isRemovingMember}
                    onMemberAdd={addMember}
                    onMemberRemove={removeMember}
                />
            </div>
            <DeleteDialog dialogRef={deleteDialogRef}>
                {({ onConfirmAsync }) => (
                    <>
                        <Text>{t('confirmDeletion')}</Text>
                        <Button variant="danger" text={t('action.delete')} isLoading={isRemovingShoppingList} onClick={onConfirmAsync} />
                    </>
                )}
            </DeleteDialog>
        </div>
    );
};
