import { RxCross2 as CrossIcon } from 'react-icons/rx';

import { Text } from '@components/Text';
import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

interface IToast {
    message: string;
    visible?: boolean;
    onDismiss?: () => void;
}

export const Toast = ({ message, visible, onDismiss: handleDismiss }: IToast) => (
    <div className={classNames(styles.container, visible && styles.visible)} onClick={handleDismiss}>
        <Text>{message}</Text>
        <CrossIcon />
    </div>
);
