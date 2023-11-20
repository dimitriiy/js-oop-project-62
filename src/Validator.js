class BaseValidator {
    constructor(isRequired, customValidators) {
        this.isRequired = isRequired;
        this.validators = [];
        this.customValidators = customValidators ?? {};
    }

    test(name, data) {
        this.validators.push((value) => this.customValidators[name](value, data));

        return this;
    }

    _baseValidation(value) {
        throw new Error("BaseValidation not implemented!");
    }

    isEmptyValue(value) {
        if (!this.isRequired && (value == null || value === "")) return true;

        return false;
    }

    _addValidators(fn) {
        this.validators.push(fn);
    }

    required() {
        this.isRequired = true;
        return this;
    }
}
class StringValidator extends BaseValidator {
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
        this._addValidators(this._contains(value));
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
        this._addValidators(this._isPositive);

        return this;
    }

    range(start, end) {
        this._addValidators(this._isInRange(start, end));

        return this;
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
        this._addValidators(this._baseValidation);
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
        this._addValidators(this._checkSize(length));
        return this;
    }
}

class ObjectValidator extends BaseValidator {
    constructor(isRequired) {
        super(isRequired);
        this.shapeStructure = null;
        this._addValidators(this._baseValidation);
    }

    _baseValidation(value) {
        if (typeof value !== "object" || value === null) return false;

        return Object.entries(value).every(([key, value]) => this.shapeStructure[key].isValid(value));
    }
    shape(objectData) {
        this.shapeStructure = objectData;
    }

    isValid(value) {
        if (this.isEmptyValue(value)) return true;

        return this._baseValidation(value);
    }
}

export class Validator extends BaseValidator {
    constructor(props) {
        super(props);

        this.customValidators = {};
    }

    addValidator(type, name, fn) {
        this.customValidators = {
            [type]: {
                [name]: fn,
            },
        };

        return this;
    }
    string() {
        return new StringValidator(this.isRequired, this.customValidators["string"]);
    }
    number() {
        return new NumberValidator(this.isRequired, this.customValidators["number"]);
    }

    array() {
        return new ArrayValidator(this.isRequired);
    }
    object() {
        return new ObjectValidator(this.isRequired);
    }
}
