import { useCallback, useRef } from 'react';

import { type Actions, type Options } from '.';

export const useDialog = (options: Options) => {
    const dialogRef = useRef<Actions & Options>({ onConfirm: options.onConfirm, onCancel: options.onCancel, prompt: undefined });

    const prompt = useCallback(
        (promptOptions?: Options) => {
            if (dialogRef.current.prompt) dialogRef.current.prompt();
            if (promptOptions?.onConfirm) dialogRef.current.onConfirm = promptOptions.onConfirm;
            if (promptOptions?.onCancel) dialogRef.current.onCancel = promptOptions.onCancel;
        },
        [dialogRef],
    );

    return { dialogRef, prompt };
};
