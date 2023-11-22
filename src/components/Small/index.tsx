import styles from './styles.module.css';

interface ISmall {
    children: string;
}

export const Small = ({ children }: ISmall) => <small className={styles.container}>{children}</small>;
