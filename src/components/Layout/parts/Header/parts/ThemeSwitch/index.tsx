import { useEffect, useState } from 'react';
import { RxMoon as MoonIcon, RxSun as SunIcon } from 'react-icons/rx';
import { z } from 'zod';

import { Button } from '@components/Button';

const ATTRIBUTE = 'data-theme';

enum Theme {
    Light = 'light',
    Dark = 'dark',
}

const themeIcon = {
    [Theme.Light]: MoonIcon,
    [Theme.Dark]: SunIcon,
};

const themeSchema = z.nativeEnum(Theme);
const persistedTheme = themeSchema.safeParse(window.localStorage.getItem(ATTRIBUTE));

document.addEventListener('DOMContentLoaded', () => {
    if (persistedTheme.success) document.documentElement.setAttribute('data-theme', persistedTheme.data);
});

export const ThemeSwitch = () => {
    const [theme, setTheme] = useState<Theme>(persistedTheme.success ? persistedTheme.data : Theme.Light);

    const themeSwitch = () => {
        if (theme === Theme.Light) setTheme(Theme.Dark);
        else if (theme === Theme.Dark) setTheme(Theme.Light);
    };

    useEffect(() => {
        document.documentElement.setAttribute(ATTRIBUTE, theme);
        window.localStorage.setItem(ATTRIBUTE, theme);
    }, [theme]);

    return <Button icon={themeIcon[theme]} onClick={themeSwitch} />;
};
