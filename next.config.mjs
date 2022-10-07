import { env } from './src/env/server.mjs';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'blend-playlist-covers.spotifycdn.com',
      'mosaic.scdn.co',
      'lineup-images.scdn.co',
      'i.scdn.co',
      't.scdn.co',
      'newjams-images.scdn.co',
      'dailymix-images.scdn.co',
      'seed-mix-image.spotifycdn.com',
      'charts-images.scdn.co',
      'daily-mix.scdn.co',
      'mixed-media-images.spotifycdn.com',
      'seeded-session-images.scdn.co',
    ],
  },
});
