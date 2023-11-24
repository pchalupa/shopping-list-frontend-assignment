import { classNames } from '@utils/classNames';

import styles from './index.module.css';

interface IText {
    children: string;
    className?: string;
}

export const Text = ({ children, className }: IText) => <p className={classNames(styles.container, className)}>{children}</p>;
