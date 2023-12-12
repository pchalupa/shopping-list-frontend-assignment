import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import { z } from 'zod';

import { Small } from '@components/Small';
import { Text } from '@components/Text';
import { ErrorCode } from '@services/api';

import styles from './styles.module.css';

const errorSchema = z.object({ message: z.nativeEnum(ErrorCode) });

export const ErrorPage = () => {
    const error = useRouteError();
    const { t } = useTranslation();
    const message = errorSchema.safeParse(error);

    return (
        <div className={styles.container}>
            <h1>Oops!</h1>
            <Text>Sorry, an unexpected error has occurred.</Text>
            {message.success && <Small>{t(`error.${message.data.message}`)}</Small>}
        </div>
    );
};
