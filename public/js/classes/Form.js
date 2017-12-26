class Form {

    constructor (formId, callback) {
        this.fd = {
            form: $('#' + formId)
        }

        this.callback = callback;

        if (this.fd.form.length) {
            this._addEvents();
        }
    }

    /**
     * @returns {{errors: Array}} - объект результата по умолчанию
     */
    _getDefaultRes() {
        return {
            errors: [],
            response: null,
        }
    }

    /**
     * Занимается проверкой всех полей
     */
    _validate() {
        let fields = this.fd.form.find('[data-rules]');
        let that = this;
        fields.each(function() {
            that.curField = {
                field: $(this),
                rules: $(this).data('rules')
            }

            if (typeof that.curField.rules === 'object') {
                that._validateRequired()
                that._validateEmail()
                that._validateSame()
            }

        });
    }

    /**
     * Add events to submit form
     */
    _addEvents() {
        let that = this;
        this.fd.form.on('submit', function() {
            that._clear();
            that._validate();

            if (!that.res.errors.length) {
                that._send();
            } else {
                window[that.callback](that.res);
            }
            return false;
        })
    }

    /**
     * Set default values for object
     */
    _clear() {
        this.res = this._getDefaultRes();
        this.curField = null;
    }

    _send() {
        let that = this;
        let method = this.fd.form.attr('method') || 'post';
        if (method === 'post') {
            let data = new FormData(this.fd.form[0]);

            $.ajax({
                type: method,
                url: this.fd.form.attr('action'),
                data: data,
                complete: function(xhr, status){
                    that.res.response = xhr;
                    window[that.callback](that.res);
                }
            });

        }
    }

    /**
     * Add error to errors object
     * @param rule - rule on which an error occurred
     */
    _addError(rule) {
        this.res.errors.push( {
            rule: rule,
            name: this.curField.field.attr('name'),
            label: this.curField.rules.label ? this.curField.rules.label : '',
        })
    }


    /**
     * Validate required fields
     */
    _validateRequired() {
        if (this.curField.rules.required) {
            if (!$.trim(this.curField.field.val())) {
                this._addError('required')
            }
        }
    }

    /**
     * Validate fields for correct email
     */
    _validateEmail() {
        if (this.curField.rules.email) {
            let template = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!template.test($.trim(this.curField.field.val()))) {
                this._addError('email');
            }
        }
    }

    /**
     * Validate fields for the same values
     * @private
     */
    _validateSame() {
        if (this.curField.rules.same) {
            let sameField = this.fd.form.find('[name=' + $.trim(this.curField.rules.same) + ']');
            if (!sameField || sameField.val() !== this.curField.field.val()) {
                this._addError('same');
            }
        }
    }

}


