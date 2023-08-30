import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';

export default defineConfig({
  plugins: [
    banner({
      content: `
// ==UserScript==
// @name         US Bing Trigger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  When you search on Bing, it will force the country setting to be US.
// @author       yyhhenry@foxmail.com
// @match        https://www.bing.com/*
// @match        https://cn.bing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
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
