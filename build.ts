import * as esbuild from "esbuild";
import pkg from "./package.json";

const manualMetadata = `
// @match        https://www.bing.com/*
// @match        https://cn.bing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// @noframes
`;

// Auto-generate metadata
const name = pkg.name;
const user = pkg.author.name;
const version = pkg.version;
const description = pkg.description;
const github = `https://github.com/${user}/${name}`;
const download = `${github}/releases/latest/download/${name}.user.js`;

const banner = `
// ==UserScript==
// @name         ${name}
// @namespace    ${github}
// @version      ${version}
// @description  ${description}
// @author       ${user}
// @homepage     ${github}
// @updateURL    ${download}
// @downloadURL  ${download}
${manualMetadata}
// ==/UserScript==
`.trim();

await esbuild.build({
  entryPoints: ["index.ts"],
  bundle: true,
  outfile: "dist/us-bing-trigger.user.js",
  banner: {
    js: banner,
  },
});
