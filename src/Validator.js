import ArrayValidator from './validators/ArrayValidator.js';
import NumberValidator from './validators/NumberValidator.js';
import ObjectValidator from './validators/ObjectValidator.js';
import StringValidator from './validators/StringValidator.js';

const VALIDATOR_TYPES = {
  string: 'string',
  number: 'number',
  array: 'array',
  object: 'object',
};

const mixin = (instance, validators) => {
  class A extends instance {
    test(name, data) {
      this.validators.push((value) => this[name](value, data));

      return this;
    }
  }

  Object.assign(A.prototype, validators);

  return A;
};

class Validator {
  constructor() {
    this.isRequired = false;
    this.customValidators = {};
  }

  addValidator(type, name, fn) {
    if (!VALIDATOR_TYPES[type]) {
      throw new Error(`${type} is not supported!`);
    }

    this.customValidators = {
      [type]: {
        [name]: fn,
      },
    };

    return this;
  }

  required() {
    this.isRequired = true;
    return this;
  }

  string() {
    if (this.customValidators[VALIDATOR_TYPES.string]) {
      const V = mixin(StringValidator, this.customValidators[VALIDATOR_TYPES.string]);

      return new V();
    }

    return new StringValidator({
      isRequired: this.isRequired,
    });
  }

  number() {
    if (this.customValidators[VALIDATOR_TYPES.number]) {
      const V = mixin(NumberValidator, this.customValidators[VALIDATOR_TYPES.number]);

      return new V();
    }

    return new NumberValidator({
      isRequired: this.isRequired,
    });
  }

  array() {
    return new ArrayValidator({ isRequired: this.isRequired });
  }

  object() {
    return new ObjectValidator({ isRequired: this.isRequired });
  }
}

export default Validator;
