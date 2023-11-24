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

import { List } from './parts/List';
import styles from './styles.module.css';
import { useDashboardData } from './useDashboardData';

const formSchema = z.object({ name: z.string().min(1) });

type FormSchema = z.infer<typeof formSchema>;

export const DashboardPage = () => {
    const { data, add, remove } = useDashboardData();
    const { dialogRef, prompt, close } = useDialog({});
    const { register, handleSubmit, reset } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleFormSubmit = handleSubmit(async (data) => {
        const newList = await add(data);

        reset();
        close();
        navigate(`${Route.Detail}/${newList?.id}`);
    });

    const handleAddButtonClick = useCallback(() => {
        reset();
        prompt();
    }, [reset, prompt]);

    return (
        <div>
            <List items={data} onItemRemove={remove} />
            <Button icon={PlusIcon} variant="success" className={styles.addButton} onClick={handleAddButtonClick} />
            <AddListDialog dialogRef={dialogRef}>
                {() => (
                    <div>
                        <form className={styles.addListForm} onSubmit={handleFormSubmit}>
                            <TextInput label={t('listName')} placeholder={t('listName')} register={register('name', { required: true })} />
                            <div>
                                <Button type="submit" text={t('save')} variant="success" />
                            </div>
                        </form>
                    </div>
                )}
            </AddListDialog>
        </div>
    );
};
