const Mocha = require('mocha');
const fs = require('fs');
const escapeRe = require('escape-string-regexp');


Mocha.prototype.fgrep = function(str) {
    const path = process.env.ALLURE_TESTPLAN_PATH;
    if (path && fs.existsSync(path)) {
        const data = fs.readFileSync(path);
        const testplan = JSON.parse(data.toString());
        const fullNames = [];
        testplan.tests.forEach(test => {
            fullNames.push(escapeRe(test.selector));
        })
        const pattern = fullNames.join("$|") + "$";
        return this.grep(new RegExp(pattern));
    }

    if (!str) {
        return this;
    }

    return this.grep(new RegExp(escapeRe(str)));
};
