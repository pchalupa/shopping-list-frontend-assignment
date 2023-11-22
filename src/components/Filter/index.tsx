import { useTranslation } from 'react-i18next';

import { Button } from '@components/Button';

import styles from './styles.module.css';

interface IFilter<Value> {
    criteria: Array<{ translationKey: string; value: Value }>;
    active: Value;
    onChange: (value: Value) => void;
}

export const Filter = <Value,>({ criteria, active, onChange }: IFilter<Value>) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            {criteria.map(({ translationKey, value }) => (
                <Button
                    key={String(value)}
                    text={t(`filter.${translationKey}`)}
                    variant={active === value ? 'active' : undefined}
                    onClick={() => onChange(value)}
                />
            ))}
        </div>
    );
};
