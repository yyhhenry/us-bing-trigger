import { defineConfig } from "vite-plus";
import pkg from "./package.json" with { type: "json" };
import { type ScriptMetadata, generateBanner, iconFromDomain } from "./utils/metadata.ts";

const metadata: ScriptMetadata = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author.name,
  description: pkg.description,
  icon: iconFromDomain("bing.com"),
  match: ["https://www.bing.com/*", "https://cn.bing.com/*"],
};

export default defineConfig({
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  pack: {
    entry: { "us-bing-trigger.user": "src/main.ts" },
    format: "esm",
    platform: "browser",
    target: "es2020",
    minify: true,
    banner: generateBanner(metadata),
  },
  staged: {
    "*": "vp check --fix",
  },
});
