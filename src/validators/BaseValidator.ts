import { CustomValidator, ValidatorFunc } from '../Validator';

export type Options<T, D> = {
  isRequired?: boolean;
  customValidators?: CustomValidator<T, D>;
};

abstract class BaseValidator<T> {
  private isRequired: boolean;
  private readonly customValidators: CustomValidator<T, unknown>;
  protected validators: ValidatorFunc<T>[];

  constructor({ isRequired = false, customValidators = {} }: Options<T, unknown>) {
    this.validators = [];
    this.isRequired = isRequired;
    this.customValidators = customValidators;
  }

  abstract isValid(value: T): boolean;

  test(name: string, data: unknown) {
    this.validators.push((value: T) => this.customValidators[name](value, data));

    return this;
  }

  isEmptyValue(value: unknown) {
    if (!this.isRequired && (value == null || value === '')) return true;

    return false;
  }

  addValidators(fn: ValidatorFunc<T>) {
    this.validators.push(fn);
  }

  required() {
    this.isRequired = true;
    return this;
  }
}

export default BaseValidator;
