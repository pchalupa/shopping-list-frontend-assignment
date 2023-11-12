import { type FormEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@components/Button';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './styles.module.css';

interface IHeader {
    name?: string;
    onArchiveClick: () => void;
    onDeleteClick: () => void;
    onNameChange: (name: string) => void;
    isOwner: boolean;
}

const formSchema = z.object({
    name: z.string().trim().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const Header = ({
    name = '',
    onArchiveClick: handleArchiveClick,
    onDeleteClick: handleDeleteClick,
    onNameChange: handleNameChange,
    isOwner,
}: IHeader) => {
    const { register, handleSubmit, setValue } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
    const { t } = useTranslation();

    const handleInput = useCallback(
        (e: FormEvent) => {
            if (e.currentTarget.textContent) {
                setValue('name', e.currentTarget.textContent, {
                    shouldDirty: true,
                });
            }
        },
        [setValue],
    );

    const handleBlur = handleSubmit(({ name }) => handleNameChange(name));

    return (
        <div className={styles.container}>
            <h1 contentEditable={isOwner} {...register('name')} className={styles.title} onInput={handleInput} onBlur={handleBlur}>
                {name}
            </h1>
            {isOwner && (
                <div className={styles.wrapper}>
                    <Button text={t('archive')} variant="warning" onClick={handleArchiveClick} />
                    <Button text={t('delete')} variant="danger" onClick={handleDeleteClick} />
                </div>
            )}
        </div>
    );
};
