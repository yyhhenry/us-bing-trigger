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
function t() {
  return new URL(window.location.href);
}
function e() {
  const n = t();
  return n.host === "cn.bing.com" || n.host == "www.bing.com" && n.searchParams.get("mkt") === "zh-CN";
}
function r() {
  const n = t();
  return n.host = "www.bing.com", n.searchParams.delete("mkt"), n.searchParams.set("cc", "us"), n;
}
e() && window.location.replace(r());
