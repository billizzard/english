const fs = require('fs');
const path = require('path')
const ruleFolder = 'rules';
module.exports = (req, res, next) => {
    req.requestValidate = (ruleFile) => (alias) => {
        let rulePath = path.join(__dirname, ruleFolder, ruleFile + '.js');
        try {
            fs.accessSync(rulePath, fs.constants.R_OK);
            let rules = require(rulePath);
            rules[alias] ? rules[alias](req) : null;
            return addFlushErrors(req);
        } catch(err) {

        }
    }
    next();
}

function addFlushErrors(req) {
    let errors = req.validationErrors();
    if (errors) {
        errors.forEach(val => {
            req.flash('danger', val.msg);
        })
        return false
    }
    return true;

}