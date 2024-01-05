import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@services/theme/useTheme';

import { OPTIONS, PENDING_COLOR_TOKEN, SOLVED_COLOR_TOKEN } from './index.preset';
import styles from './styles.module.css';

interface IPlot {
    solved: number;
    pending: number;
}

ChartJS.register(ArcElement, Legend, Tooltip);

export const Chart = ({ solved, pending }: IPlot) => {
    const colors = useTheme(SOLVED_COLOR_TOKEN, PENDING_COLOR_TOKEN);
    const { t } = useTranslation();
    const data = useMemo(
        () => ({
            labels: [t('solved'), t('pending')],
            datasets: [
                {
                    data: [solved, pending],
                    backgroundColor: colors,
                },
            ],
        }),
        [t, solved, pending, colors],
    );

    return <div className={styles.container}>{(solved > 0 || pending > 0) && <Pie data={data} options={OPTIONS} className={styles.chart} />}</div>;
};
