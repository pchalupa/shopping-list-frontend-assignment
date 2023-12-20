import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { onThemeChange } from '@services/theme';

import { OPTIONS } from './index.preset';
import { getColors } from './index.utils';
import styles from './styles.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface IChart {
    stats?: Array<{ name: string; items: number; solved: number }>;
}

export const Chart = ({ stats }: IChart) => {
    const [colors, setColors] = useState<string[]>(getColors());
    const { t } = useTranslation();
    const data = useMemo(
        () =>
            stats?.reduce<{
                labels: string[];
                datasets: [{ label: string; data: number[]; backgroundColor: string }, { label: string; data: number[]; backgroundColor: string }];
            }>(
                (result, item) => {
                    result.labels.push(item.name);

                    // All items
                    result.datasets[0].data.push(item.items);
                    result.datasets[0].backgroundColor = colors[1];

                    // Solved items
                    result.datasets[1].data.push(item.solved);
                    result.datasets[1].backgroundColor = colors[0];

                    return result;
                },
                {
                    labels: [],
                    datasets: [
                        { label: t('items'), data: [], backgroundColor: colors[0] },
                        { label: t('solved'), data: [], backgroundColor: colors[0] },
                    ],
                },
            ),
        [stats, colors, t],
    );

    useEffect(() => {
        const unsubscribe = onThemeChange(() => setColors(getColors()));

        return () => {
            unsubscribe();
        };
    }, []);

    return <div className={styles.container}>{data && <Bar options={OPTIONS} data={data} />}</div>;
};
