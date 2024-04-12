[![Actions Status](https://github.com/dimitriiy/js-oop-project-62/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/dimitriiy/js-oop-project-62/actions)

### Проект

# Валидатор данных

## Installation and Usage


```ts
    //string validator
    const validator = new Validator();
    const schema = validator.string().required();
    schema.isValid('what does the fox say'); // true   


    //number validator
    const validator = new Validator();
    const schema = validator.number().required();
    schema.range(-10, 10);
    schema.isValid(11); // true   

    //array validator
    const validator = new Validator();
    const schema = validator.array().required();
    schema.sizeof(2);
    schema.isValid(['hexlet', 'code-basics']) // true   

    //shape validator
    const validator = new Validator();
    const schema = validator.object();
    schema.shape({
        name: v.string(),
        age: v.number().positive(),
    });

    schema.isValid({ name: 'kolya', age: 100 }); // true

```