module.exports = {
    getError: (err, message, code, view) => {
        return {
            err: err,
            message: message,
            code: code || 400,
            view: view
        }
    }
};
