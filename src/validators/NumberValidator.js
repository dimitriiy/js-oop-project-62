import BaseValidator from './BaseValidator.js';

const isInRange = (start, end) => (value) => start <= value && value <= end;
const isPositive = (value) => value > 0;
class NumberValidator extends BaseValidator {
  constructor(options) {
    super(options);

    this.addValidators(NumberValidator.baseValidation);
  }

  static baseValidation(value) {
    return typeof value === 'number';
  }

  positive() {
    this.addValidators(isPositive);

    return this;
  }

  range(start, end) {
    this.addValidators(isInRange(start, end));

    return this;
  }

  isValid(value) {
    if (this.isEmptyValue(value)) return true;

    return this.validators.every((fn) => fn(value));
  }
}

export default NumberValidator;
