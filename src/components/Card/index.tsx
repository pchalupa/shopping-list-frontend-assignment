import { type PropsWithChildren } from 'react';
import { classNames } from 'utils/classNames';

import styles from './styles.module.css';

interface ICard extends PropsWithChildren {
    className?: string;
}

export const Card = ({ children, className }: ICard) => <div className={classNames(styles.container, className)}>{children}</div>;
