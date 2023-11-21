import BaseValidator from './BaseValidator.js';

const contains = (search) => (value) => value.includes(search);

class StringValidator extends BaseValidator {
  constructor(options) {
    super(options);
    this.addValidators(StringValidator.baseValidation);
  }

  static baseValidation(value) {
    return typeof value === 'string' && value !== '';
  }

  isValid(value) {
    if (this.isEmptyValue(value)) return true;

    return this.validators.every((fn) => fn(value));
  }

  contains(value) {
    this.addValidators(contains(value));
    return this;
  }
}

export default StringValidator;
