import { z } from 'zod';

import * as storage from '../storage';
import { THEME_ATTRIBUTE } from './index.preset';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

const themeSchema = z.nativeEnum(Theme);

export const getTheme = (): Theme => {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
    const persistedTheme = themeSchema.safeParse(currentTheme ?? storage.getItem(storage.Key.Theme));

    if (persistedTheme.success) return persistedTheme.data;

    return Theme.Light;
};

export const setTheme = (theme: Theme) => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    storage.setItem(storage.Key.Theme, theme);
};

export const setupThemeLoader = () => {
    const currentTheme = getTheme();

    document.addEventListener('DOMContentLoaded', () => {
        if (currentTheme) document.documentElement.setAttribute(THEME_ATTRIBUTE, currentTheme);
    });
};
