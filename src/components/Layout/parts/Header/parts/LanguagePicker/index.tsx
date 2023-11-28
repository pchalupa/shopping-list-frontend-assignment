import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import styles from './styles.module.css';

const formSchema = z.object({ language: z.string() });

type FormSchema = z.infer<typeof formSchema>;

export const LanguagePicker = () => {
    const { register, handleSubmit } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
    const { t, i18n } = useTranslation();

    const handleLanguageChange = handleSubmit(async ({ language }) => {
        await i18n.changeLanguage(language);
    });

    return (
        <form className={styles.container} onChange={handleLanguageChange}>
            <select className={styles.select} {...register('language')}>
                {i18n.languages.map((language) => (
                    <option key={language} value={language} selected={language === i18n.language}>
                        {t(`language.${language}`)}
                    </option>
                ))}
            </select>
        </form>
    );
};
