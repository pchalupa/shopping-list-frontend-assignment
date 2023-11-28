import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Route } from 'router';

import { Button } from '@components/Button';
import { Dialog as DeleteDialog } from '@components/Dialog';
import { useDialog } from '@components/Dialog/useDialog';
import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { Header } from './parts/Header';
import { List } from './parts/List';
import { Metadata } from './parts/Metadata';
import styles from './styles.module.css';
import { useShoppingListData } from './useShoppingListData';

export const DetailPage = () => {
    const { id = '' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isLoading, data, updateName, remove, archive, addItem, solveItem, removeItem, addMember, removeMember, isOwner, isMember } =
        useShoppingListData(id);
    const { dialogRef: deleteDialogRef, prompt: promptToDelete } = useDialog({
        async onConfirm() {
            await remove();
            navigate(Route.Dashboard);
        },
    });

    const handleArchiveClick = useCallback(async () => {
        await archive();
        navigate('/');
    }, [archive, navigate]);

    if (isLoading) return <Loader className={styles.loader} />;
    if (!isLoading && !data) navigate(Route.Dashboard);
    if (!isMember && !isOwner) navigate(Route.Dashboard);

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
                <List items={data?.items} onItemClick={solveItem} onItemAdd={addItem} onItemDeleteClick={removeItem} />
                <Metadata owner={data?.owner?.name} members={data?.members} isOwner={isOwner} onMemberAdd={addMember} onMemberRemove={removeMember} />
            </div>
            <DeleteDialog dialogRef={deleteDialogRef}>
                {({ onConfirm }) => (
                    <>
                        <Text>{t('confirmDeletion')}</Text>
                        <Button variant="danger" text={t('action.delete')} onClick={onConfirm} />
                    </>
                )}
            </DeleteDialog>
        </div>
    );
};
