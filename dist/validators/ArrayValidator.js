"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
const checkSize = (length) => (value) => value.length >= length;
class ArrayValidator extends BaseValidator_1.default {
    constructor(options) {
        super(options);
        this.addValidators(ArrayValidator.baseValidation);
    }
    static baseValidation(value) {
        return Array.isArray(value);
    }
    isValid(value) {
        if (this.isEmptyValue(value))
            return true;
        return this.validators.every((fn) => fn(value));
    }
    sizeof(length) {
        this.addValidators(checkSize(length));
        return this;
    }
}
exports.default = ArrayValidator;
