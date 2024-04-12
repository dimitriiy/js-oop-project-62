"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const ArrayValidator_1 = __importDefault(require("./validators/ArrayValidator"));
const NumberValidator_1 = __importDefault(require("./validators/NumberValidator"));
const ObjectValidator_1 = __importDefault(require("./validators/ObjectValidator"));
const StringValidator_1 = __importDefault(require("./validators/StringValidator"));
class Validator {
    constructor() {
        this.isRequired = false;
        this.customValidators = {};
    }
    required() {
        this.isRequired = true;
        return this;
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
        return new StringValidator_1.default({ isRequired: this.isRequired, customValidators: this.customValidators.string });
    }
    number() {
        return new NumberValidator_1.default({ isRequired: this.isRequired, customValidators: this.customValidators.number });
    }
    array() {
        return new ArrayValidator_1.default({ isRequired: this.isRequired });
    }
    object() {
        return new ObjectValidator_1.default({ isRequired: this.isRequired });
    }
}
exports.Validator = Validator;
exports.default = Validator;
