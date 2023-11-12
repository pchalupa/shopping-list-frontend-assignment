export const classNames = (...classes: Array<string | undefined | boolean>) => classes.filter(Boolean).join(' ');
