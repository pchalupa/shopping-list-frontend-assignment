import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Filter } from '@components/Filter';
import { Small } from '@components/Small';
import { useUserContext } from '@contexts/UserContext/useUserContext';

import { Filter as Filtering, criteria } from './index.preset';
import { Item } from './parts/Item';
import styles from './styles.module.css';

interface IList {
    items?: Array<{ id: string; name: string; owner: { id: string; name: string }; updatedAt: number; archivedAt?: number }>;
    onItemRemove: (id: string) => void;
}

export const List = ({ items = [], onItemRemove: handleItemRemove }: IList) => {
    const [filter, setFilter] = useState(criteria.at(0)?.value);
    const { user } = useUserContext();
    const { t } = useTranslation();
    const data = items.filter((item) => {
        const isActive = filter === Filtering.Active && !item.archivedAt;
        const isArchived = filter === Filtering.Archived && item.archivedAt;

        return isActive || isArchived;
    });

    return (
        <div className={styles.container}>
            <Filter criteria={criteria} active={filter} onChange={setFilter} />
            <div className={styles.wrapper}>
                {data.length ? (
                    data.map(({ id, name, owner, updatedAt }) => (
                        <Item
                            key={id}
                            id={id}
                            name={name}
                            owner={owner}
                            updatedAt={updatedAt}
                            isOwner={owner.id === user.id}
                            onRemoveClick={handleItemRemove}
                        />
                    ))
                ) : (
                    <Small>{t('emptyList')}</Small>
                )}
            </div>
        </div>
    );
};
