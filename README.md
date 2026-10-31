# us-bing-trigger

A Tampermonkey userscript that automatically switches from Chinese Bing to the global version.

When the page is Chinese Bing, the script redirects to `www.bing.com` while keeping the search query. If the global version is unreachable and Bing falls back to Chinese Bing, the script gives up and stays.

## Quick Start

1. Install Tampermonkey from [tampermonkey.net](https://www.tampermonkey.net/).

2. Add the script from the latest GitHub release: [us-bing-trigger.user.js](https://github.com/yyhhenry/us-bing-trigger/releases/latest/download/us-bing-trigger.user.js).

## Development

```sh
vp install   # Install dependencies
vp config    # One-time per clone: install the commit hooks
vp pack      # Build dist/us-bing-trigger.user.js
vp run local # Build + serve for local Tampermonkey install
```

The build writes `dist/us-bing-trigger.user.js`, ready to install or release.
