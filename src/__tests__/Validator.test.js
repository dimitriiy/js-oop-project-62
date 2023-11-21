import { describe, expect, it } from '@jest/globals';

import Validator from '../Validator.js';

describe('Test Validator', () => {
  describe('Test string validation', () => {
    it('Test empty', () => {
      const v = new Validator();

      const schema = v.string();

      expect(schema.isValid('')).toBeTruthy(); // true
      expect(schema.isValid(null)).toBeTruthy(); // true
      expect(schema.isValid(undefined)).toBeTruthy(); // true
    });

    it('Test required', () => {
      const v = new Validator();

      const schema = v.string().required();

      expect(schema.isValid('what does the fox say')).toBeTruthy(); // true
      expect(schema.isValid('hexlet')).toBeTruthy(); // true
      expect(schema.isValid(null)).toBeFalsy(); // false
      expect(schema.isValid('')).toBeFalsy(); // false
    });

    it('Test contains', () => {
      const v = new Validator();

      const schema = v.string();

      expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
      expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
      expect(schema.isValid('what does the fox say')).toBeFalsy();
    });
  });

  describe('Test number validation', () => {
    it('Test null', () => {
      const v = new Validator();

      const schema = v.number();

      expect(schema.isValid(null)).toBeTruthy(); // true
    });

    it('Test required', () => {
      const v = new Validator();

      const schema = v.number();

      schema.isValid(null); // true

      schema.required();

      expect(schema.isValid(null)).toBeFalsy(); // false
      expect(schema.isValid(7)).toBeTruthy(); // true
    });

    it('Test range', () => {
      const v = new Validator();

      const schema = v.number();

      schema.range(-10, 10);

      expect(schema.isValid(10)).toBeTruthy();
      expect(schema.isValid(-2020)).toBeFalsy();
      expect(schema.isValid(11)).toBeFalsy();
    });

    it('Test positive', () => {
      const v = new Validator();

      const schema = v.number();

      schema.positive();

      expect(schema.isValid(10)).toBeTruthy();
      expect(schema.isValid(-2020)).toBeFalsy();
      expect(schema.isValid(-1)).toBeFalsy();
    });
  });

  describe('Test array', () => {
    it('Test empty', () => {
      const v = new Validator();
      const schema = v.array();

      expect(schema.isValid(null)).toBeTruthy(); // true
    });
    it('Test required', () => {
      const v = new Validator();
      const schema = v.array();

      schema.required();

      expect(schema.isValid(null)).toBeFalsy(); // false
      expect(schema.isValid([])).toBeTruthy(); // true
      expect(schema.isValid(['hexlet'])).toBeTruthy(); // true
    });

    it('Test sizeof', () => {
      const v = new Validator();
      const schema = v.array();

      schema.sizeof(2);

      expect(schema.isValid(['hexlet'])).toBeFalsy(); // false
      expect(schema.isValid(['hexlet', 'code-basics'])).toBeTruthy(); // true
    });
  });

  describe('Test shape', () => {
    it('base 0', () => {
      const v = new Validator();

      const schema = v.object();

      schema.shape({
        name: v.string(),
        age: v.number().positive(),
      });

      expect(schema.isValid(null)).toBeTruthy(); // true
    });
    it('base 1', () => {
      const v = new Validator();

      const schema = v.object();

      schema.shape({
        name: v.string().required(),
        age: v.number().positive(),
      });

      expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy(); // true
      expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy(); // true
      expect(schema.isValid({ name: '', age: null })).toBeFalsy(); // false
      expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy(); // false
    });

    it('base 2', () => {
      const v = new Validator();

      const schema = v.object();

      schema.shape({
        name: v.string().required(),
        age: v.number().positive().range(-10, 100),
        data: v.array().required().sizeof(2),
      });

      expect(schema.isValid({ name: 'kolya', age: -1000, data: ['a', 'b', 'c'] })).toBeFalsy(); // true
      expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy(); // true
      expect(schema.isValid({ name: '22', age: 222, data: ['1', '2'] })).toBeFalsy(); // false
      expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy(); // false
      expect(schema.isValid({ name: 'adass', age: 11, data: ['1', '44'] })).toBeTruthy(); // false
    });
  });

  describe('Test custom valiadtors', () => {
    it('Test string', () => {
      const v = new Validator();

      const fn = (value, start) => value.startsWith(start);

      v.addValidator('string', 'startWith', fn);

      const schema = v.string().test('startWith', 'H');
      expect(schema.isValid('exlet')).toBeFalsy(); // false
      expect(schema.isValid('Hexlet')).toBeTruthy(); // true
    });

    it('Test number', () => {
      const v = new Validator();

      const fn = (value, min) => value >= min;
      v.addValidator('number', 'min', fn);

      const schema = v.number().test('min', 5);
      expect(schema.isValid(4)).toBeFalsy(); // false
      expect(schema.isValid(6)).toBeTruthy(); // true
    });
  });
});
