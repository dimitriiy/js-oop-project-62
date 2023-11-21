import BaseValidator from './BaseValidator.js';

const contains = (search) => (value) => value.includes(search);

class StringValidator extends BaseValidator {
  isValid(value) {
    if (this.isEmptyValue(value)) return true;

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

export default StringValidator;
