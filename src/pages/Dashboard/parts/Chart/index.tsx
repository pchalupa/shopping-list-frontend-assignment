import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@services/theme/useTheme';

import { ALL_COLOR_TOKEN, OPTIONS, SOLVED_COLOR_TOKEN } from './index.preset';
import styles from './styles.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface IChart {
    stats?: Array<{ name: string; items: number; solved: number }>;
}

export const Chart = ({ stats }: IChart) => {
    const [allItemsColor, solvedItemsColor] = useTheme(ALL_COLOR_TOKEN, SOLVED_COLOR_TOKEN);
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
                    result.datasets[0].backgroundColor = allItemsColor;

                    // Solved items
                    result.datasets[1].data.push(item.solved);
                    result.datasets[1].backgroundColor = solvedItemsColor;

                    return result;
                },
                {
                    labels: [],
                    datasets: [
                        { label: t('items'), data: [], backgroundColor: allItemsColor },
                        { label: t('solved'), data: [], backgroundColor: solvedItemsColor },
                    ],
                },
            ),
        [stats, allItemsColor, solvedItemsColor, t],
    );

    return <div className={styles.container}>{data && <Bar options={OPTIONS} data={data} />}</div>;
};
