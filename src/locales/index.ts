import { en } from './en';
import { ar } from './ar';

export const locales = { en, ar };

export type LocaleType = typeof en;
export type LanguageType = 'en' | 'ar';
