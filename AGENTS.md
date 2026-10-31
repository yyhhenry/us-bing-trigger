# us-bing-trigger

A Tampermonkey userscript that redirects Chinese Bing to the global version. When the page is Chinese Bing (`cn.bing.com`, or `www.bing.com` with `mkt=zh-cn`/`cc=cn`), the script redirects to `www.bing.com` with `cc=us` while keeping the search query. A `us-bing-trigger` mark parameter records the redirect; if the page is still Chinese Bing afterwards, the global version is unreachable and the script gives up.

## Key Files

| Path                 | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `src/main.ts`        | Userscript entry: detects Chinese Bing and redirects.        |
| `utils/metadata.ts`  | Builds the `// ==UserScript==` banner from `ScriptMetadata`. |
| `build.ts`           | Bundles `src/main.ts` and writes `dist/*.user.js`.           |
| `vite.config.ts`     | Vite+ configuration: Oxfmt and Oxlint settings.              |
| `dist/`              | Build output. Generated; never edit by hand.                 |
| `.github/workflows/` | CI check and release workflows.                              |

`vp run build` runs `node build.ts` and writes `dist/us-bing-trigger.user.js`: a single bundled ESM script (target `es2020`) with the userscript banner prepended. Installed users auto-update through `updateURL`, so do not change the output file name, banner fields, or bundle shape.

## Vite+

This project uses [Vite+](https://viteplus.dev/guide/) (`vp`) for package management and code quality. Docs are local at `node_modules/vite-plus/docs`. Run `vp help` or `vp <command> --help` for details.

- `vp install` — install dependencies.
- `vp check` — format (Oxfmt), lint (Oxlint), and type check; config lives in `vite.config.ts`.
- `vp run build` — run the `build` script (`node build.ts`). Note `vp build` is the Vite production build, a different thing.

Code, comments, and documentation are written in English.
