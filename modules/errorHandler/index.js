module.exports = {
    getError: (err, message, code, view) => {
        return {
            err: err,
            message: message,
            code: code || 400,
            view: view
        }
    },

    BadRequestError: (err, id) => {
        let error = new Error(err);
        error.http_code = id || 400
        return error;
    }
};
