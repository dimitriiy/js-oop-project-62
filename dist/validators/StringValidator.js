"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
const contains = (search) => (value) => value.includes(search);
class StringValidator extends BaseValidator_1.default {
    isValid(value) {
        if (this.isEmptyValue(value))
            return true;
        if (this.validators.length && value) {
            return this.validators.every((fn) => fn(value));
        }
        return typeof value === 'string' && value !== '';
    }
    contains(value) {
        this.addValidators(contains(value));
        return this;
    }
}
exports.default = StringValidator;
