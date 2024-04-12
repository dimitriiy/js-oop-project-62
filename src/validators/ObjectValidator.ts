import BaseValidator, { Options } from './BaseValidator';

class ObjectValidator<T extends object> extends BaseValidator<T> {
  private shapeStructure: Record<string, BaseValidator<T>> | null;

  constructor(options: Options<T, unknown>) {
    super(options);
    this.shapeStructure = null;
    this.addValidators(this.baseValidation);
  }

  baseValidation(value: unknown) {
    if (typeof value !== 'object' || value === null) return false;

    return Object.entries(value).every(([key, v]) => this.shapeStructure?.[key].isValid(v));
  }

  shape<S extends Record<string, BaseValidator<T>>>(objectData: S) {
    this.shapeStructure = objectData;
  }

  isValid(value: unknown) {
    if (this.isEmptyValue(value)) return true;

    return this.baseValidation(value);
  }
}

export default ObjectValidator;
