import BaseValidator from './BaseValidator';

const isInRange = (start: number, end: number) => (value: number) => start <= value && value <= end;
const isPositive = (value: number) => value > 0;
class NumberValidator<T extends number> extends BaseValidator<T> {
  positive() {
    this.addValidators(isPositive);

    return this;
  }

  range(start: number, end: number) {
    this.addValidators(isInRange(start, end));

    return this;
  }

  isValid(value: unknown) {
    if (this.isEmptyValue(value)) return true;

    if (this.validators.length) {
      return this.validators.every((fn) => fn(value as T));
    }

    return typeof value === 'number';
  }
}

export default NumberValidator;
