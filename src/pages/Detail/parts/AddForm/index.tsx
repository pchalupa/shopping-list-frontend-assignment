import { useForm } from 'react-hook-form';
import { RxPlus as PlusIcon } from 'react-icons/rx';
import { z } from 'zod';

import { Button } from '@components/Button';
import { TextInput } from '@components/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './styles.module.css';

interface IAddForm {
    onAdd: (item: { name: string }) => void;
    placeholder?: string;
}

const formSchema = z.object({
    name: z.string().trim().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const AddForm = ({ onAdd, placeholder }: IAddForm) => {
    const { register, handleSubmit, reset } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

    const handleFormSubmit = handleSubmit((data) => {
        onAdd(data);
        reset();
    });

    return (
        <form className={styles.container} onSubmit={handleFormSubmit}>
            <TextInput register={register('name', { required: true })} placeholder={placeholder} className={styles.input} />
            <Button icon={PlusIcon} type="submit" variant="success" />
        </form>
    );
};
