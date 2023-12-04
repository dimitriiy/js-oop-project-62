"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseValidator {
    constructor({ isRequired = false, customValidators = {} }) {
        this.isRequired = isRequired;
        this.validators = [];
        this.customValidators = customValidators;
    }
    test(name, data) {
        this.validators.push((value) => this.customValidators[name](value, data));
        return this;
    }
    isEmptyValue(value) {
        if (!this.isRequired && (value == null || value === ''))
            return true;
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
exports.default = BaseValidator;
