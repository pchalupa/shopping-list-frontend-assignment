import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Route } from 'router';

import { Loader } from '@components/Loader';

import { Header } from './parts/Header';
import { List } from './parts/List';
import { Metadata } from './parts/Metadata';
import styles from './styles.module.css';
import { useShoppingListData } from './useShoppingListData';

export const DetailPage = () => {
    const { id = '' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isLoading, data, updateName, remove, archive, addItem, solveItem, removeItem, addMember, removeMember, isOwner, isMember } =
        useShoppingListData(id);

    const handleDeleteClick = useCallback(async () => {
        await remove();
        navigate(Route.Dashboard);
    }, [remove, navigate]);

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
                onDeleteClick={handleDeleteClick}
                onNameChange={updateName}
            />
            <div className={styles.wrapper}>
                <List items={data?.items} onItemClick={solveItem} onItemAdd={addItem} onItemDeleteClick={removeItem} />
                <Metadata owner={data?.owner?.name} members={data?.members} isOwner={isOwner} onMemberAdd={addMember} onMemberRemove={removeMember} />
            </div>
        </div>
    );
};
