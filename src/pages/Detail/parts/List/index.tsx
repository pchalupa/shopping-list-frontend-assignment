import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Filter } from '@components/Filter';
import { Loader } from '@components/Loader';
import { Small } from '@components/Small';

import { AddForm } from '../AddForm';
import { Filter as Filtering, criteria } from './index.preset';
import { Item } from './parts/Item';
import styles from './styles.module.css';

interface IList {
    items?: Array<{ id: string; name: string; solvedAt?: number }>;
    onItemClick: (id: string) => void;
    onItemAdd: (item: { name: string }) => void;
    onItemDeleteClick: (id: string) => void;
    isLoading?: boolean;
}

export const List = ({
    items = [],
    onItemClick: handleItemSolveClick,
    onItemDeleteClick: handleItemDeleteClick,
    onItemAdd: handleItemAdd,
    isLoading,
}: IList) => {
    const [filter, setFilter] = useState(criteria.at(0)?.value);
    const { t } = useTranslation();
    const data = items.filter(({ solvedAt }) => !solvedAt || filter === Filtering.All);

    return (
        <div className={styles.container}>
            <Filter criteria={criteria} active={filter} onChange={setFilter} />
            <div className={styles.list}>
                {data.length ? (
                    data.map(({ id, name, solvedAt }) => (
                        <Item
                            key={id}
                            id={id}
                            name={name}
                            isSolved={Boolean(solvedAt)}
                            onSolveClick={handleItemSolveClick}
                            onDeleteClick={handleItemDeleteClick}
                        />
                    ))
                ) : (
                    <Small>{t('emptyList')}</Small>
                )}
            </div>
            <AddForm placeholder={t('newItem')} onAdd={handleItemAdd} />
            {isLoading && <Loader className={styles.loader} />}
        </div>
    );
};
