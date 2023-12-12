import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RxPlus as PlusIcon } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { Route } from 'router';
import { z } from 'zod';

import { Button } from '@components/Button';
import { Dialog as AddListDialog } from '@components/Dialog';
import { useDialog } from '@components/Dialog/useDialog';
import { TextInput } from '@components/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorHandler } from '@hooks/useErrorHandler';
import * as Api from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Grid } from './parts/Grid';
import styles from './styles.module.css';

const formSchema = z.object({ name: z.string().min(1, { message: 'required' }) });

type FormSchema = z.infer<typeof formSchema>;

export const DashboardPage = () => {
    const { handleError } = useErrorHandler();
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['shoppingLists'],
        queryFn: async () => Api.getShoppingLists(),
        throwOnError: true,
    });
    const { mutateAsync: addShoppingList, isPending: isAddingShoppingList } = useMutation<Api.ShoppingList, Error, { name: string }>({
        mutationKey: ['shoppingList'],
        mutationFn: async (data) => Api.addShoppingList(data),
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
    const { dialogRef, prompt: promptName, close: closeModal } = useDialog({});
    const { register, handleSubmit, reset: resetForm, formState } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleFormSubmit = handleSubmit(async (data) => {
        const newList = await addShoppingList(data);

        resetForm();
        closeModal();
        navigate(`${Route.Detail}/${newList?.id}`);
    });

    const handleAddButtonClick = useCallback(() => {
        resetForm();
        promptName();
    }, [resetForm, promptName]);

    return (
        <>
            <Grid items={data} isLoading={isRemovingShoppingList} onItemRemove={removeShoppingList} />
            <Button icon={PlusIcon} variant="success" className={styles.addButton} onClick={handleAddButtonClick} />
            <AddListDialog dialogRef={dialogRef}>
                {() => (
                    <form className={styles.addListForm} onSubmit={handleFormSubmit}>
                        <TextInput
                            label={t('listName')}
                            placeholder={t('listName')}
                            register={register('name', { required: true })}
                            error={formState.errors.name}
                        />
                        <div>
                            <Button type="submit" text={t('action.save')} variant="success" isLoading={isAddingShoppingList} />
                        </div>
                    </form>
                )}
            </AddListDialog>
        </>
    );
};
