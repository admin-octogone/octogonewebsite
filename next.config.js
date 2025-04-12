/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: La configuration i18n a été supprimée car elle n'est pas supportée dans App Router
  // L'internationalisation est gérée via le middleware et les paramètres de route [locale]
}

module.exports = nextConfig
