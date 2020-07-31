/*
 Most of this file contents were copy-pasted over from https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-reports/lib/json-summary/index.js
 with some minor modifications
 */
'use strict';
const { ReportBase } = require('istanbul-lib-report');

class MissingCoverageJsonSummaryReport extends ReportBase {
    constructor(opts) {
        super();

        this.file = opts.file || 'missing-coverage-summary.json';
        this.contentWriter = null;
        this.first = true;
    }

    onStart(root, context) {
        this.contentWriter = context.writer.writeFile(this.file);
        this.contentWriter.write('{');
    }

    writeSummary(filePath, sc) {
        const cw = this.contentWriter;
        if (this.first) {
            this.first = false;
        } else {
            cw.write(',');
        }
        cw.write(JSON.stringify(filePath));
        cw.write(': ');
        cw.write(JSON.stringify(sc));
        cw.println('');
    }

    onSummary(node) {
        if (!node.isRoot()) {
            return;
        }
        this.writeSummary('total', node.getCoverageSummary());
    }

    onDetail(node) {
        const summary = node.getCoverageSummary();
        const isMissingCoverage = Object.values(summary.data).some(p => p.pct !== 100);

        if (isMissingCoverage) {
            this.writeSummary(
                node.getFileCoverage().path,
                summary
            );
        }
    }

    onEnd() {
        const cw = this.contentWriter;
        cw.println('}');
        cw.close();
    }
}

module.exports = MissingCoverageJsonSummaryReport;
