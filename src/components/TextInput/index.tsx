import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { classNames } from '@utils/classNames';

import { Label } from './parts/Label';
import styles from './styles.module.css';

interface ITextInput {
    register: UseFormRegisterReturn;
    placeholder?: string;
    label?: string;
    className?: string;
    error?: FieldError;
}

export const TextInput = ({ register, label, placeholder, error, className }: ITextInput) => {
    const { t } = useTranslation();

    return (
        <label className={classNames(className, styles.container, error && styles.error)}>
            {label && <Label>{label}</Label>}
            <input type="text" {...register} className={styles.input} placeholder={placeholder} />
            {error?.message && <Label>{t(error.message)}</Label>}
        </label>
    );
};
