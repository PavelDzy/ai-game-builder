import { defineConfig } from 'vite';
// base './' — собранный сайт открывается из любой папки и на любом хостинге (GitHub Pages, Netlify).
export default defineConfig({ base: './', server: { port: 5180 } });
