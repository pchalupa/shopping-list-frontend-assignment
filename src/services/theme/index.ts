import { z } from 'zod';

import * as storage from '../storage';
import { THEME_ATTRIBUTE, THEME_CHANGE_EVENT_NAME } from './index.preset';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

const themeSchema = z.nativeEnum(Theme);
const themeEventTarget = new EventTarget();
const themeChangeEvent = new Event(THEME_CHANGE_EVENT_NAME);

export const getTheme = (): Theme => {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
    const persistedTheme = themeSchema.safeParse(currentTheme ?? storage.getItem(storage.Key.Theme));

    if (persistedTheme.success) return persistedTheme.data;

    return Theme.Light;
};

export const setTheme = (theme: Theme) => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    storage.setItem(storage.Key.Theme, theme);
    themeEventTarget.dispatchEvent(themeChangeEvent);
};

export const setupThemeLoader = () => {
    const currentTheme = getTheme();

    document.addEventListener('DOMContentLoaded', () => {
        if (currentTheme) document.documentElement.setAttribute(THEME_ATTRIBUTE, currentTheme);
    });
};

export const onThemeChange = (callback: () => void) => {
    themeEventTarget.addEventListener(THEME_CHANGE_EVENT_NAME, callback);

    return () => themeEventTarget.removeEventListener(THEME_CHANGE_EVENT_NAME, callback);
};
