# Missing Coverage Summary Json Istanbul Reporter
Custom [Istanbuljs](https://github.com/istanbuljs/istanbuljs) reporter to generate json summary only for the files that have coverage below 100%

## Installing

In your project:
```
npm install -i istanbul-reporter-missing-coverage-summary-json --save-dev
```

Then run `nyc` with this reporter via the command line:

```
nyc --reporter=istanbul-reporter-missing-coverage-summary-json
```
