import { useEffect, useState } from 'react';

import { Button } from '@components/Button';
import { Theme, getTheme, setTheme } from '@services/theme';

import { themeIconMap } from './index.preset';
import styles from './styles.module.css';

export const ThemeSwitch = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme());

    const themeSwitch = () => {
        if (currentTheme === Theme.Light) setCurrentTheme(Theme.Dark);
        else if (currentTheme === Theme.Dark) setCurrentTheme(Theme.Light);
    };

    useEffect(() => {
        setTheme(currentTheme);
    }, [currentTheme]);

    return <Button icon={themeIconMap[currentTheme]} className={styles.container} onClick={themeSwitch} />;
};
