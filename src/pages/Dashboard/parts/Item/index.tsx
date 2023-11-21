import { format } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RxCross2 as CrossIcon } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Text } from '@components/Text';

import styles from './styles.module.css';

interface IItem {
    id: string;
    name: string;
    owner: { name: string };
    updatedAt: number;
    onRemoveClick: (id: string) => void;
}

export const Item = ({ id, name, owner, updatedAt, onRemoveClick }: IItem) => {
    const { t } = useTranslation();

    const handleRemoveClick = useCallback(() => onRemoveClick(id), [id, onRemoveClick]);
    console.log(updatedAt);
    return (
        <Card className={styles.container}>
            <Link key={id} to={`/detail/${id}`} className={styles.link}>
                <p>{name}</p>
                <Text>{format(updatedAt, 'ii.M.yyyy HH:mm')}</Text>
                <p>
                    {t('owner')}: {owner.name}
                </p>
            </Link>
            <div className={styles.actionsWrapper}>
                <Button icon={CrossIcon} onClick={handleRemoveClick} />
            </div>
        </Card>
    );
};
