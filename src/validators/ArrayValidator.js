import BaseValidator from './BaseValidator.js';

const checkSize = (length) => (value) => value.length >= length;
class ArrayValidator extends BaseValidator {
  constructor(options) {
    super(options);
    this.addValidators(ArrayValidator.baseValidation);
  }

  static baseValidation(value) {
    return Array.isArray(value);
  }

  isValid(value) {
    if (this.isEmptyValue(value)) return true;

    return this.validators.every((fn) => fn(value));
  }

  sizeof(length) {
    this.addValidators(checkSize(length));
    return this;
  }
}

export default ArrayValidator;
