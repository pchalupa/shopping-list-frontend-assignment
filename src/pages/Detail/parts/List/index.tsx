import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/Button';

import { AddForm } from '../AddForm';
import { Filter } from './index.preset';
import { Item } from './parts/Item/idnex';
import styles from './styles.module.css';

interface IList {
    items: Array<{ id: string; name: string; solvedAt: string }>;
    onItemClick: (id: string) => void;
    onItemAdd: (item: { name: string }) => void;
    onItemDeleteClick: (id: string) => void;
}

export const List = ({ items, onItemClick: handleItemSolveClick, onItemDeleteClick: handleItemDeleteClick, onItemAdd: handleItemAdd }: IList) => {
    const [filter, setFilter] = useState<Filter>(Filter.Active);
    const { t } = useTranslation();
    const data = items.filter(({ solvedAt }) => !solvedAt || filter === Filter.All);

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <Button
                    text={t('filter.active')}
                    variant={filter === Filter.Active ? 'active' : undefined}
                    onClick={() => setFilter(Filter.Active)}
                />
                <Button text={t('filter.all')} variant={filter === Filter.All ? 'active' : undefined} onClick={() => setFilter(Filter.All)} />
            </div>
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
                    <p className={styles.empty}>{t('emptyList')}</p>
                )}
            </div>
            <AddForm placeholder={t('newItem')} onAdd={handleItemAdd} />
        </div>
    );
};
