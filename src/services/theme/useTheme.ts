import { useEffect, useState } from 'react';

import { onThemeChange } from '.';

const getValues = (keys: string[]): string[] => {
    const style = getComputedStyle(document.documentElement);

    return keys.map((key) => style.getPropertyValue(key));
};

export const useTheme = (...keys: string[]) => {
    const [values, setValues] = useState<string[]>(getValues(keys));

    useEffect(() => {
        const unsubscribe = onThemeChange(() => setValues(getValues(keys)));

        return () => {
            unsubscribe();
        };
    }, [keys]);

    return values;
};
