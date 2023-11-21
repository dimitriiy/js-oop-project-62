import ArrayValidator from './validators/ArrayValidator.js';
import NumberValidator from './validators/NumberValidator.js';
import ObjectValidator from './validators/ObjectValidator.js';
import StringValidator from './validators/StringValidator.js';

class Validator {
  constructor() {
    this.isRequired = false;
    this.customValidators = {};
  }

  required() {
    this.isRequired = true;
    return this;
  }

  addValidator(type, name, fn) {
    this.customValidators = {
      [type]: {
        [name]: fn,
      },
    };

    return this;
  }

  string() {
    return new StringValidator(this.isRequired, this.customValidators.string);
  }

  number() {
    return new NumberValidator(this.isRequired, this.customValidators.number);
  }

  array() {
    return new ArrayValidator(this.isRequired);
  }

  object() {
    return new ObjectValidator(this.isRequired);
  }
}

export default Validator;
