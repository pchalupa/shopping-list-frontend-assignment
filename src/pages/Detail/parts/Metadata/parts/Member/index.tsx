import { useCallback } from 'react';
import { RxCross2 as CrossIcon } from 'react-icons/rx';

import { Button } from '@components/Button';
import { useUserContext } from '@contexts/UserContext/useUserContext';

import styles from './styles.module.css';

interface IMember {
    id: string;
    name: string;
    onRemove: (id: string) => void;
    isOwner: boolean;
}

export const Member = ({ id, name, onRemove: handleRemove, isOwner }: IMember) => {
    const { user } = useUserContext();
    const isCurrentUser = user.id === id;

    const handleRemoveClick = useCallback(() => handleRemove(id), [id, handleRemove]);

    return (
        <div className={styles.container}>
            <p className={styles.text}>{name}</p>
            {(isOwner || isCurrentUser) && <Button icon={CrossIcon} variant="danger" onClick={handleRemoveClick} />}
        </div>
    );
};
