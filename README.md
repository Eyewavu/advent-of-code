# Node.js Typescript template

<div align="center">
  <img src="https://nodejs.org/static/images/favicons/favicon.ico" alt="Node.js" width="32" height="32">
  <img src="https://www.typescriptlang.org/favicon-32x32.png" alt="TS" width="32" height="32">
  <img src="https://eslint.org/favicon.ico" alt="eslint" width="32" height="32">
  <img src="https://www.rollupjs.org/favicon.png" alt="Rollup" width="32" height="32">
  <img src="https://yarnpkg.com/favicon.svg" alt="Yarn" width="32" height="32">
</div>

Quick boilerplate setup for making Node.js applications in Typescript.

## Getting started
create fresh app
```sh
git clone https://github.com/Eyewavu/nodejs-typescript-template.git my-app
cd my-app
yarn install && yarn dev
```
or add to existing directory
```sh
git clone https://github.com/Eyewavu/nodejs-typescript-template.git .
yarn install && yarn dev
```

## Folder structure
```
my-app/
├── node_modules/
├── .gitignore
├── rollup.config.js
├── package.json
├── tsconfig.json
├── yarn.lock
├── README.md
│
├── src/
│   └── index.ts
│   └── utils/
│
└── dist/
    └── index.js
    └── index.js.map
    └── index.d.ts

```


## Folder aliases
```
"@"  - src/
"@u" - src/utils/
```

## DevDependencies used
- <img src="https://www.rollupjs.org/favicon.png" alt="@rollup/plugin-node-resolve" width="16" height="16"> @rollup/plugin-node-resolve
- <img src="https://www.rollupjs.org/favicon.png" alt="@rollup/plugin-typescript" width="16" height="16"> @rollup/plugin-typescript
- <img src="https://static.npmjs.com/favicon.ico" alt="rollup-plugin-terser" width="16" height="16"> rollup-plugin-terser
- <img src="https://www.rollupjs.org/favicon.png" alt="rollup" width="16" height="16"> rollup
---
- <img src="https://eslint.org/favicon.ico" alt="eslint" width="16" height="16"> eslint
- <img src="https://eslint.org/favicon.ico" alt="@typescript-eslint/eslint-plugin" width="16" height="16"> @typescript-eslint/eslint-plugin
- <img src="https://eslint.org/favicon.ico" alt="@typescript-eslint/parser" width="16" height="16"> @typescript-eslint/parser
---
- <img src="https://www.typescriptlang.org/favicon-32x32.png" alt="tslib" width="16" height="16"> tslib
- <img src="https://www.typescriptlang.org/favicon-32x32.png" alt="typescript" width="16" height="16"> typescript