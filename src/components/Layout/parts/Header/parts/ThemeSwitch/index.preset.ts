import { RxMoon as MoonIcon, RxSun as SunIcon } from 'react-icons/rx';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

export const themeIconMap = {
    [Theme.Light]: MoonIcon,
    [Theme.Dark]: SunIcon,
};

export const ATTRIBUTE = 'data-theme';
