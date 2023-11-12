import { type UseFormRegisterReturn } from 'react-hook-form';

import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

interface ITextInput {
    register: UseFormRegisterReturn;
    placeholder?: string;
    className?: string;
}

export const TextInput = ({ register, placeholder, className }: ITextInput) => (
    <input type="text" {...register} className={classNames(className, styles.container)} placeholder={placeholder} />
);
