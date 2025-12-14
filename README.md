# Solflare Assignment

Automated test assignment created by Ivica Jezernik using WebdriverIO


## How to run testcases

1. Clone repository
2. Open terminal in local repository
3. Install node dependencies
```bash
  npm install
```
4. Use the following command to run all tests
```bash
  npx wdio run wdio.conf.js
```
5. Add a spec parameter to the command to run only one specific test
```bash
  npx wdio run wdio.conf.js --spec .\test\specs\solflare_test1.ts
```