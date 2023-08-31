import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    banner({
      content: `
// ==UserScript==
// @name         ${pkg.name}
// @namespace    http://tampermonkey.net/
// @version      ${pkg.version}
// @description  ${pkg.description.replaceAll('\n', ' ')}
// @author       ${pkg.author.email}
// @match        https://www.bing.com/*
// @match        https://cn.bing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// @homepage     https://github.com/yyhhenry/us-bing-trigger
// ==/UserScript==
  `.trim(),
      verify: false,
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: ['src/index.ts'],
      formats: ['es'],
      fileName: 'us-bing-trigger.user',
    },
  },
});
