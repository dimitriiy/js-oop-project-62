class BaseValidator {
    constructor(isRequired) {
        this.isRequired = isRequired;
        this.validators = [];
    }

    _baseValidation(value) {
        throw new Error("BaseValidation not implemented!");
    }

    isEmptyValue(value) {
        if (!this.isRequired && (value == null || value === "")) return true;

        return false;
    }

    addValidators(fn) {
        this.validators.push(fn);
    }
    required() {
        this.isRequired = true;
        return this;
    }
}
class StringValidator extends BaseValidator {
    constructor(isRequired) {
        super(isRequired);

        this.validators = [];
    }
    isValid(value) {
        if (this.isEmptyValue(value)) return true;

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
        this.addValidators(this._contains(value));
        return this;
    }
}
class NumberValidator extends BaseValidator {
    _isPositive(value) {
        return value > 0;
    }

    _isInRange(start, end) {
        return (value) => start <= value && value <= end;
    }

    positive() {
        this.addValidators(this._isPositive);

        return this;
    }

    range(start, end) {
        this.addValidators(this._isInRange(start, end));
    }

    isValid(value) {
        if (this.isEmptyValue(value)) return true;

        if (this.validators.length) {
            return this.validators.every((fn) => fn(value));
        }

        return typeof value === "number";
    }
}
class ArrayValidator extends BaseValidator {
    constructor(isRequired) {
        super(isRequired);
        this.addValidators(this._baseValidation);
    }

    _baseValidation(value) {
        return Array.isArray(value);
    }

    _checkSize(length) {
        return (value) => value.length >= length;
    }
    isValid(value) {
        if (this.isEmptyValue(value)) return true;

        return this.validators.every((fn) => fn(value));
    }

    sizeof(length) {
        this.addValidators(this._checkSize(length));
        return this;
    }
}

export class Validator extends BaseValidator {
    string() {
        return new StringValidator(this.isRequired);
    }
    number() {
        return new NumberValidator(this.isRequired);
    }

    array() {
        return new ArrayValidator(this.isRequired);
    }
    shape() {}
}
