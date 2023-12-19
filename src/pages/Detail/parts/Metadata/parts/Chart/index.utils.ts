import { PENDING_COLOR_TOKEN, SOLVED_COLOR_TOKEN } from './index.preset';

export const getColors = (): [string, string] => {
    const style = getComputedStyle(document.documentElement);

    return [style.getPropertyValue(SOLVED_COLOR_TOKEN), style.getPropertyValue(PENDING_COLOR_TOKEN)];
};
