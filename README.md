# Issue extract

Extracts the message template from the PR / Issue on GitHub to post on Slack channel.

## How to install

1. Download archive and extract
1. Go to chrome://extensions and enable developer mode
1. Click `Load unpacked` (`パッケージ化されていない拡張機能を読み込む`) and select the folder

## Build

```bash
npm install
npm run build
```

It will output `dist` directory. You can load it on Chrome to test the extension.

Use `npm run dev` for development purpose. It watches source files and re-build automatically at file changes.
