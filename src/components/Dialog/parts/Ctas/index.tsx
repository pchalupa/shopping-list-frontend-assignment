import { useTranslation } from 'react-i18next';

import { Button } from '@components/Button';

import styles from './styles.module.css';

interface ICtas {
    onConfirm?: () => void;
    onCancel?: () => void;
}

export const Ctas = ({ onConfirm, onCancel }: ICtas) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Button text={t('confirm')} variant="danger" onClick={onConfirm} />
            <Button text={t('close')} onClick={onCancel} />
        </div>
    );
};
