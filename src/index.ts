// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.npmjs.com/search?q=%40tsconfig
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        none
// ==/UserScript==

export function getCurrentURL() {
  return new URL(window.location.href);
}
export function isCNBing() {
  const url = getCurrentURL();
  return (
    url.host === 'cn.bing.com' ||
    (url.host == 'www.bing.com' && url.searchParams.get('mkt') === 'zh-CN')
  );
}
