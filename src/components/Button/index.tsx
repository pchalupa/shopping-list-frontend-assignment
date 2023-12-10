import { type IconType } from 'react-icons';

import { Loader } from '@components/Loader';
import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

interface IButton {
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'active' | 'success' | 'warning' | 'danger';
    icon?: IconType;
    text?: string;
    className?: string;
    isLoading?: boolean;
}

export const Button = ({ onClick, variant = 'primary', type = 'button', text, icon: Icon, className, isLoading }: IButton) => (
    <button className={classNames(styles.container, styles[variant], className)} type={type} disabled={isLoading} onClick={onClick}>
        {isLoading && <Loader className={styles.loader} />}
        {!isLoading && (
            <>
                {Icon && <Icon />}
                {text && <span>{text}</span>}
            </>
        )}
    </button>
);
