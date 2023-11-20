class BaseValidator {
    required() {
        this.isRequired = true;
        return this;
    }
}
class StringValidator extends BaseValidator {
    constructor(isRequired) {
        super();
        this.isRequired = isRequired;
        this.validators = [];
    }
    isValid(value) {
        if (!this.isRequired && (value == null || value === "")) return true;

        if (this.validators.length && value) {
            return this.validators.every((fn) => fn(value));
        }
        return typeof value === "string" && value !== "";
    }

    _contains(search) {
        return (value) => {
            return value.includes(search);
        };
    }
    contains(value) {
        this.validators.push(this._contains(value));
        return this;
    }
}
class NumberValidator extends BaseValidator {}

export class Validator extends BaseValidator {
    string() {
        return new StringValidator(this.isRequired);
    }
    number() {}

    shape() {}
}
