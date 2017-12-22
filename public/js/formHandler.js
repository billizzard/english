(function( $ ) {
    class HandleForm {

        constructor (formId) {
            this.formId = formId;
            this.form = $('#' + formId);
            this.errors = [];
            this.c = {
                rules: {
                    required: 'h_required'
                }
            }
        }

        validate () {
            this.validateRequire();
        }

        validateRequire() {
            let that = this;
            this.form.find('.' + that.c.rules.required).each(function() {
                if (!$.trim($(this).val())) {
                    that.addError(that.c.rules.required, $(this).attr('name'))
                }
            })
        }

        send() {

        }

        addError(rule, name) {
            this.errors.push( {
                rule: rule,
                name: name,
            })
        }

        getResult() {
            this.validate();
            this.send();
            return {
                errors: this.errors
            }
        }
    }

    $.handleForm = function(formId) {
        let hf = new HandleForm(formId);

        return hf.getResult();

    };
}( jQuery ));

