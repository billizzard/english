module.exports = {
    getSuccessMessage: (message) => {
        return {
            message: {
                text: message,
                type: 'success'
            }
        }
    },

    getErrorMessage: (message) => {
        return {
            message: {
                text: message,
                type: 'danger'
            }
        }
    }
};