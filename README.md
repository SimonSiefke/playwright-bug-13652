# playwright-bug-13652

```sh
git clone git@github.com:SimonSiefke/playwright-bug-13652.git &&
cd playwright-bug-13652 &&
npm ci &&
node src/main.js
```

## Output

```
node src/main.js
Found existing install in /home/simon/.cache/repos/playwright-bug-13652/.vscode-test/vscode-linux-x64-1.66.2. Skipping download
locator.hover: TypeError: Cannot read properties of undefined (reading 'includes')
    at parseSelectorString (<anonymous>:1291:17)
    at parseSelector (<anonymous>:1197:18)
    at InjectedScript.parseSelector (<anonymous>:3790:20)
    at makeStrict (<anonymous>:3450:43)
    at cssFallback (<anonymous>:3494:10)
    at generateSelector (<anonymous>:3303:40)
    at InjectedScript.generateSelector (<anonymous>:3798:12)
    at <anonymous>:4443:22
    at Array.map (<anonymous>)
    at InjectedScript.strictModeViolationError (<anonymous>:4441:40)
=========================== logs ===========================
waiting for selector ".scrollbar.vertical"
  Cannot read properties of undefined (reading 'includes')
============================================================
    at Module.run (file:///home/simon/.cache/repos/playwright-bug-13652/src/scenario.js:38:19)
    at runScenario (file:///home/simon/.cache/repos/playwright-bug-13652/src/main.js:57:5)
    at main (file:///home/simon/.cache/repos/playwright-bug-13652/src/main.js:66:3)
Scenario exited with code 1
```
