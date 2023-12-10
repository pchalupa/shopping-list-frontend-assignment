import { useTranslation } from 'react-i18next';

import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { Text } from '@components/Text';

import { AddForm } from '../AddForm';
import { Member } from './parts/Member';
import styles from './styles.module.css';

interface IMetadata {
    owner?: string;
    members?: Array<{ id: string; name: string }>;
    onMemberAdd: (member: { name: string }) => void;
    onMemberRemove: (id: string) => void;
    isOwner: boolean;
    isLoading?: boolean;
}

export const Metadata = ({ owner = '', members = [], onMemberAdd, onMemberRemove, isOwner, isLoading }: IMetadata) => {
    const { t } = useTranslation();

    return (
        <Card className={styles.container}>
            <p className={styles.title}>{t('owner')}</p>
            <Text>{owner}</Text>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>{t('member', { count: members.length })}</p>
                {isLoading && <Loader className={styles.loader} />}
            </div>
            <div className={styles.members}>
                {members.map(({ id, name }) => (
                    <Member key={id} id={id} name={name} isOwner={isOwner} onRemove={onMemberRemove} />
                ))}
            </div>
            {isOwner && <AddForm placeholder={t('addMember')} onAdd={onMemberAdd} />}
        </Card>
    );
};
