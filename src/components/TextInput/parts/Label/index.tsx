import styles from './styles.module.css';

interface ILabel {
    children: string;
}

export const Label = ({ children }: ILabel) => <span className={styles.container}>{children}</span>;
