import { type MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

export type Actions = { prompt?: () => void };

export type Options = { onConfirm?: () => void; onCancel?: () => void };

interface IDialog {
    children: (options: Options) => React.ReactNode;
    className?: string;
    dialogRef: MutableRefObject<Actions & Options>;
}

export const Dialog = ({ children, className, dialogRef }: IDialog) => {
    const ref = useRef<HTMLDialogElement | null>(null);

    const show = useCallback(() => ref.current?.showModal(), [ref]);

    const close = useCallback(() => ref.current?.close(), [ref]);

    const handleConfirm = useCallback(() => {
        if (dialogRef.current.onConfirm) dialogRef.current.onConfirm();
        close();
    }, [dialogRef, close]);

    const handleCancel = useCallback(() => {
        if (dialogRef.current.onCancel) dialogRef.current.onCancel();
        close();
    }, [dialogRef, close]);

    useEffect(() => {
        dialogRef.current.prompt = show;
    }, [dialogRef, show]);

    return (
        <dialog ref={ref} className={classNames(styles.container, className)}>
            <div className={classNames(styles.wrapper, className)}>{children({ onConfirm: handleConfirm, onCancel: handleCancel })}</div>
        </dialog>
    );
};
