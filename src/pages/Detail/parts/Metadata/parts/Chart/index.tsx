import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { onThemeChange } from '@services/theme';

import { getColors } from './index.utils';
import styles from './style.module.css';

interface IPlot {
    solved: number;
    pending: number;
}

ChartJS.register(ArcElement, Legend, Tooltip);

export const Chart = ({ solved, pending }: IPlot) => {
    const [colors, setColors] = useState<string[]>(getColors());
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
    const options = useMemo(() => ({ plugins: { legend: { onClick: () => undefined } } }), []);

    useEffect(() => {
        const unsubscribe = onThemeChange(() => setColors(getColors()));

        return () => {
            unsubscribe();
        };
    }, []);

    return <div className={styles.container}>{(solved > 0 || pending > 0) && <Pie data={data} options={options} className={styles.chart} />}</div>;
};
