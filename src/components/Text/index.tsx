import styles from './index.module.css';

interface IText {
    children: string;
}

export const Text = ({ children }: IText) => <p className={styles.container}>{children}</p>;
