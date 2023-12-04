"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
const isInRange = (start, end) => (value) => start <= value && value <= end;
const isPositive = (value) => value > 0;
class NumberValidator extends BaseValidator_1.default {
    positive() {
        this.addValidators(isPositive);
        return this;
    }
    range(start, end) {
        this.addValidators(isInRange(start, end));
        return this;
    }
    isValid(value) {
        if (this.isEmptyValue(value))
            return true;
        if (this.validators.length) {
            return this.validators.every((fn) => fn(value));
        }
        return typeof value === 'number';
    }
}
exports.default = NumberValidator;
