import { useCallback, useRef } from 'react';

import { type Actions, type Options } from '.';

export const useDialog = (options?: Options) => {
    const dialogRef = useRef<Actions & Options>({
        onConfirm: options?.onConfirm,
        onConfirmAsync: options?.onConfirmAsync,
        onCancel: options?.onCancel,
        prompt: undefined,
    });

    const prompt = useCallback(
        (promptOptions?: Options) => {
            if (dialogRef.current.prompt) dialogRef.current.prompt();
            if (promptOptions?.onConfirm) dialogRef.current.onConfirm = promptOptions.onConfirm;
            if (promptOptions?.onConfirmAsync) dialogRef.current.onConfirmAsync = promptOptions.onConfirmAsync;
            if (promptOptions?.onCancel) dialogRef.current.onCancel = promptOptions.onCancel;
        },
        [dialogRef],
    );

    const close = useCallback(() => {
        if (dialogRef.current.close) dialogRef.current.close();
    }, []);

    return { dialogRef, prompt, close };
};
