class FormResponse {

    constructor (res) {
        this.res = res

        this.c = {
            rules: {
                required: 'required',
                email: 'email',
                same: 'same'
            },
            types: {
                success: 'success',
                error: 'danger',
                info: 'info'
            }
        }
    }

    getFlashResponse() {
        let res = null;
        if (this.res.errors.length) {
            res = {};
            res.type = this.c.types.error
            res.text = this._getErrorText(this.res.errors[0])
        } else if (this.res.response) {
            res = {};
            res.type = this.res.response.status === 200 ? this.c.types.success : this.c.types.error;
            res.text = this.res.response.responseJSON.message.text
        }
        return res;
    }

    /**
     * @param err - Объект результата Form.js
     * @returns {string} - Строка с сообщением
     */
    _getErrorText(err) {
        let name = err.label ? err.label: err.name;
        switch (err.rule) {
            case this.c.rules.required: return 'Поле "' + name + '" обязательно';
            case this.c.rules.email: return 'Поле "' + name + '" должно быть email адресом';
            case this.c.rules.same: return 'Поле "' + name + '" не совпадает';
        }
    }

}


