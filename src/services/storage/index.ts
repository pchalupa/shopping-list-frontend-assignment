export enum Key {
    Theme = 'theme',
}

export const getItem = (key: Key) => window.localStorage.getItem(key);

export const setItem = (key: Key, value: string) => window.localStorage.setItem(key, value);
