export const defaultLocale = 'fr'
export const locales = ['fr', 'en'] as const
export type ValidLocale = (typeof locales)[number]

export const localeNames: { [key in ValidLocale]: string } = {
  fr: 'Français',
  en: 'English',
}

// Vérifier si une locale est valide
export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale)
}
