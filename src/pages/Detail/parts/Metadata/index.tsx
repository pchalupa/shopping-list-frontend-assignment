import { useTranslation } from 'react-i18next';

import { Card } from '@components/Card';

import { AddForm } from '../AddForm';
import { Member } from './parts/Member';
import styles from './styles.module.css';

interface IMetadata {
    owner?: string;
    members?: Array<{ id: string; name: string }>;
    onMemberAdd: (member: { name: string }) => void;
    onMemberRemove: (id: string) => void;
    isOwner: boolean;
}

export const Metadata = ({ owner = '', members = [], onMemberAdd, onMemberRemove, isOwner }: IMetadata) => {
    const { t } = useTranslation();

    return (
        <Card className={styles.container}>
            <p className={styles.title}>{t('owner')}</p>
            <p className={styles.text}>{owner}</p>
            <p className={styles.title}>{t('members')}</p>
            {members.map(({ id, name }) => (
                <Member key={id} id={id} name={name} isOwner={isOwner} onRemove={onMemberRemove} />
            ))}
            {isOwner && <AddForm placeholder={t('addMember')} onAdd={onMemberAdd} />}
        </Card>
    );
};
