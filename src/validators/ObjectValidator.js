import BaseValidator from './BaseValidator.js';

class ObjectValidator extends BaseValidator {
  constructor(options) {
    super(options);
    this.shapeStructure = null;
    this.addValidators(this.baseValidation);
  }

  baseValidation(value) {
    if (typeof value !== 'object' || value === null) return false;

    return Object.entries(value).every(([key, v]) => this.shapeStructure[key].isValid(v));
  }

  shape(objectData) {
    this.shapeStructure = objectData;
  }

  isValid(value) {
    if (this.isEmptyValue(value)) return true;

    return this.baseValidation(value);
  }
}

export default ObjectValidator;
