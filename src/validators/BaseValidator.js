class BaseValidator {
  constructor({ isRequired, customValidators } = { isRequired: false, customValidators: {} }) {
    this.isRequired = isRequired;
    this.validators = [];
    this.customValidators = customValidators ?? {};
  }

  isEmptyValue(value) {
    if (!this.isRequired && (value == null || value === '')) return true;

    return false;
  }

  addValidators(fn) {
    this.validators.push(fn);
  }

  required() {
    this.isRequired = true;
    return this;
  }
}

export default BaseValidator;
