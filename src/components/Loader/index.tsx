import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

interface ILoader {
    className?: string;
}

export const Loader = ({ className }: ILoader) => <div className={classNames(className, styles.container)} />;
