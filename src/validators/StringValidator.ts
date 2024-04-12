import BaseValidator from './BaseValidator';

const contains = (search: string) => (value: string) => value.includes(search);

class StringValidator<T extends string> extends BaseValidator<T> {
  isValid(value: unknown) {
    if (this.isEmptyValue(value)) return true;

    if (this.validators.length && value) {
      return this.validators.every((fn) => fn(value as T));
    }
    return typeof value === 'string' && value !== '';
  }

  contains(value: T) {
    this.addValidators(contains(value));
    return this;
  }
}

export default StringValidator;
