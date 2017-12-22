const fs = require('fs');
const path = require('path')
const ruleFolder = 'rules';
module.exports = (req, res, next) => {
    req.requestValidation = (ruleFile) => (alias) => {
        let rulePath = path.join(__dirname, ruleFolder, ruleFile + '.js');
        try {
            fs.accessSync(rulePath, fs.constants.R_OK);
            let rules = require(rulePath);
            rules[alias] ? rules[alias](req) : null;
            return req.validationErrors();
        } catch(err) {

        }
    }
    next();
}
