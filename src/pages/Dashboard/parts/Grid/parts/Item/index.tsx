import { format } from 'date-fns';
import { RxCross2 as CrossIcon } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Small } from '@components/Small';
import { Text } from '@components/Text';

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
            <h1 className={styles.title}>{name}</h1>
        </Link>
        <Text>{owner.name}</Text>
        <div className={styles.footer}>
            <Small>{format(updatedAt, 'ii.M.yyyy HH:mm')}</Small>
            {isOwner && <Button icon={CrossIcon} variant="danger" className={styles.deleteButton} onClick={handleRemoveClick} />}
        </div>
    </Card>
);
