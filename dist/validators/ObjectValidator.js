"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
class ObjectValidator extends BaseValidator_1.default {
    constructor(options) {
        super(options);
        this.shapeStructure = null;
        this.addValidators(this.baseValidation);
    }
    baseValidation(value) {
        if (typeof value !== 'object' || value === null)
            return false;
        return Object.entries(value).every(([key, v]) => this.shapeStructure[key].isValid(v));
    }
    shape(objectData) {
        this.shapeStructure = objectData;
    }
    isValid(value) {
        if (this.isEmptyValue(value))
            return true;
        return this.baseValidation(value);
    }
}
exports.default = ObjectValidator;
