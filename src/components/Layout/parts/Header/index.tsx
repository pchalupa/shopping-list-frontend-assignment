import { Text } from '@components/Text';
import { useUserContext } from '@contexts/UserContext/useUserContext';

import { LanguagePicker } from './parts/LanguagePicker';
import styles from './styles.module.css';

export const Header = () => {
    const { user } = useUserContext();

    return (
        <header className={styles.container}>
            <LanguagePicker />
            <Text>{user.name}</Text>
        </header>
    );
};
