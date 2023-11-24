import { type UseFormRegisterReturn } from 'react-hook-form';

import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

interface ITextInput {
    register: UseFormRegisterReturn;
    placeholder?: string;
    label?: string;
    className?: string;
}

export const TextInput = ({ register, label, placeholder, className }: ITextInput) => (
    <label className={classNames(className, styles.container)}>
        {label && <span className={styles.label}>{label}</span>}
        <input type="text" {...register} className={styles.input} placeholder={placeholder} />
    </label>
);
