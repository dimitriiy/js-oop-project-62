import BaseValidator, { Options } from './BaseValidator';

const checkSize = (length: number) => (value: unknown[]) => value.length >= length;

class ArrayValidator<T extends unknown[]> extends BaseValidator<T> {
  constructor(options: Options<T, unknown>) {
    super(options);
    this.addValidators(ArrayValidator.baseValidation);
  }

  static baseValidation(value: unknown) {
    return Array.isArray(value);
  }

  isValid(value: unknown) {
    if (this.isEmptyValue(value)) return true;

    return this.validators.every((fn) => fn(value as T));
  }

  sizeof(length: number) {
    this.addValidators(checkSize(length));
    return this;
  }
}

export default ArrayValidator;
