import ArrayValidator from './validators/ArrayValidator';
import NumberValidator from './validators/NumberValidator';
import ObjectValidator from './validators/ObjectValidator';
import StringValidator from './validators/StringValidator';

export type CustomValidator<Value, Data> = Record<string, (value: Value, data: Data) => boolean>;
export type CustomValidatorsCollectionMap<Value, Data> = Record<string, CustomValidator<Value, Data>>;

export type ValidatorFunc<T = unknown> = (value: T) => boolean;

export class Validator {
  private isRequired: boolean = false;

  private customValidators: CustomValidatorsCollectionMap<unknown, unknown> = {};

  required() {
    this.isRequired = true;
    return this;
  }

  addValidator(type: string, nameValidationMethod: string, customValidationFunc: () => boolean) {
    this.customValidators = {
      [type]: {
        [nameValidationMethod]: customValidationFunc,
      },
    };

    return this;
  }

  string() {
    return new StringValidator({ isRequired: this.isRequired, customValidators: this.customValidators.string });
  }

  number() {
    return new NumberValidator({ isRequired: this.isRequired, customValidators: this.customValidators.number });
  }

  array() {
    return new ArrayValidator({ isRequired: this.isRequired });
  }

  object() {
    return new ObjectValidator({ isRequired: this.isRequired });
  }
}

export default Validator;
