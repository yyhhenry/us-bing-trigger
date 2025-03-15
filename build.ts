import * as esbuild from "esbuild";
import {
  generateBanner,
  iconFromDomain,
  type ScriptMetadata,
} from "./utils/metadata.ts";
import pkg from "./package.json" with { type: "json" };

const metadata: ScriptMetadata = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author.name,
  description: pkg.description,
  icon: iconFromDomain("bing.com"),
  match: ["https://www.bing.com/*", "https://cn.bing.com/*"],
};

await esbuild.build({
  entryPoints: ["src/main.ts"],
  target: "es2020",
  bundle: true,
  outfile: `dist/${metadata.name}.user.js`,
  platform: "browser",
  format: "esm",
  banner: {
    js: generateBanner(metadata),
  },
});
