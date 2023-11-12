import { RxCheck as CheckIcon, RxCross2 as CrossIcon } from 'react-icons/rx';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

interface IItem {
    id: string;
    name: string;
    onSolveClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
    isSolved: boolean;
}

export const Item = ({ id, name, onSolveClick: handleSolveClick, onDeleteClick: handleDeleteClick, isSolved }: IItem) => (
    <Card className={classNames(styles.container, isSolved && styles.solved)}>
        <span>{name}</span>
        <div className={styles.wrapper}>
            {!isSolved && <Button icon={CheckIcon} variant="success" onClick={() => handleSolveClick(id)} />}
            <Button icon={CrossIcon} variant="danger" onClick={() => handleDeleteClick(id)} />
        </div>
    </Card>
);
