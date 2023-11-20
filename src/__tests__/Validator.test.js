import { describe, expect, it } from "@jest/globals";

import { Validator } from "../Validator.js";

describe("Test Validator", () => {
    describe("Test string validation", () => {
        it("Test empty", () => {
            const v = new Validator();

            const schema = v.string();

            expect(schema.isValid("")).toBeTruthy(); // true
            expect(schema.isValid(null)).toBeTruthy(); // true
            expect(schema.isValid(undefined)).toBeTruthy(); // true
        });

        it("Test required", () => {
            const v = new Validator();

            const schema = v.string().required();

            expect(schema.isValid("what does the fox say")).toBeTruthy(); // true
            expect(schema.isValid("hexlet")).toBeTruthy(); // true
            expect(schema.isValid(null)).toBeFalsy(); // false
            expect(schema.isValid("")).toBeFalsy(); // false
        });

        it("Test contains", () => {
            const v = new Validator();

            const schema = v.string();

            expect(schema.contains("what").isValid("what does the fox say")).toBeTruthy();
            expect(schema.contains("whatthe").isValid("what does the fox say")).toBeFalsy();
            expect(schema.isValid("what does the fox say")).toBeFalsy();
        });
    });
});
