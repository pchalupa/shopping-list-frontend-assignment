import { format } from 'date-fns';
import { RxCross2 as CrossIcon } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Small } from '@components/Small';

import styles from './styles.module.css';

interface IItem {
    id: string;
    name: string;
    owner: { name: string };
    updatedAt: number;
    isOwner: boolean;
    onRemoveClick: () => void;
}

export const Item = ({ id, name, owner, updatedAt, isOwner, onRemoveClick: handleRemoveClick }: IItem) => (
    <Card className={styles.container}>
        <Link key={id} to={`/detail/${id}`} className={styles.link}>
            <p>{name}</p>
            <p>{owner.name}</p>
            <Small>{format(updatedAt, 'ii.M.yyyy HH:mm')}</Small>
        </Link>
        {isOwner && (
            <div className={styles.actionsWrapper}>
                <Button icon={CrossIcon} onClick={handleRemoveClick} />
            </div>
        )}
    </Card>
);
