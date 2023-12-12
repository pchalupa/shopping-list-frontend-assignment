import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useToastContext } from '@contexts/ToastContext/useToastContext';
import { ErrorCode } from '@services/api';

const errorSchema = z.object({ message: z.nativeEnum(ErrorCode) });

export const useErrorHandler = () => {
    const { toast } = useToastContext();
    const { t } = useTranslation();

    const handleError = useCallback(
        (error: unknown) => {
            const message = errorSchema.safeParse(error);
            if (message.success) toast(t(`error.${message.data.message}`));
        },
        [toast, t],
    );

    return { handleError };
};
