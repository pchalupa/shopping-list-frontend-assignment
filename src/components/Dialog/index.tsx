import { type MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { RxCross2 as CrossIcon } from 'react-icons/rx';

import { Button } from '@components/Button';
import { classNames } from '@utils/classNames';

import styles from './styles.module.css';

export type Actions = { prompt?: () => void; close?: () => void };

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
        dialogRef.current.close = close;
    }, [dialogRef, show, close]);

    return (
        <dialog ref={ref} className={styles.dialog}>
            <div className={styles.container}>
                <Button icon={CrossIcon} className={styles.closeButton} onClick={handleCancel} />
                <div className={classNames(styles.wrapper, className)}>{children({ onConfirm: handleConfirm, onCancel: handleCancel })}</div>
            </div>
        </dialog>
    );
};
