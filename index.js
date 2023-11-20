import { Validator } from "./src/Validator.js";

const v = new Validator();

const schema = v.string();

console.log(schema.isValid("")); // true
console.log(schema.isValid(null)); // true
console.log(schema.isValid(undefined)); // true

schema.required();

console.log(schema.isValid("what does the fox say")); // true
console.log(schema.isValid("hexlet")); // true
console.log(schema.isValid(null)); // false
console.log(schema.isValid("")); // false
//
console.log(schema.contains("what").isValid("what does the fox say")); // true
console.log(schema.contains("whatthe").isValid("what does the fox say")); // false
//
console.log(schema.isValid("what does the fox say")); // false
