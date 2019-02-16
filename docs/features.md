# ui-form-field

[![Build Status](https://travis-ci.org/ngduc/ui-form-field.svg?branch=master)](https://travis-ci.org/ngduc/ui-form-field)

Easy React Form - ui-form-field

- Live Demo: [Codesandbox](https://codesandbox.io/s/on50k50wy)

### 🌟 Features

[![Screenshot](screenshot-compare.png)](../src/examples/BasicExample.tsx)

Not just shorter syntax, it's also offering:
- Describe Forms naturally.
- Consistent rendering, stylings (good for big projects).
- Layouts (vertical, horizontal).
- Work with different CSS Frameworks / Form Layouts (tentcss (default), bootstrap, spectre, etc.)
- More types of fields.
- Work well together with Formik - use FastField to avoid [too many re-renders](https://twitter.com/jaredpalmer/status/962114095481851910?lang=en)
- Shorthand syntax `<Field>Label | Placeholder | name</Field>`. Inspired by [Styled Component](https://github.com/styled-components/styled-components) literal string for CSS.

### 📦 Usage

```JS
$ npm install ui-form-field
import { FormContainer, Form, Field, Button } from 'ui-form-field';

<FormContainer onSubmit={this.onSubmit} render={props => (
  <Form use="bootstrap4">
    <Field>Email | Enter your email | email</Field>
    <Field radios options={genders}>Gender | gender</Field>
    <Field select options={animals}>Favorite Animal | animal</Field>

    <Button type="submit"/>
    <Button>Cancel</Button>
  </Form>
)} />
```
- To avoid conflicts, you can also use `import { EzFormContainer, EzForm, EzField, EzButton }`
- Full code example: [Link](../src/examples/BasicExample.tsx)
- Live example: [Codesandbox](https://codesandbox.io/s/on50k50wy)

Result:

[![Screenshot](screenshot.png)](../src/examples/BasicExample.tsx)

### 📖 Documentation

[Change Log](/CHANGELOG.md)

TODO:
- Support: Material, Semantic UI.
- More field types: Date Range, etc.
- (File a PR to request any feature, field type, etc.)

### 🙌 Thanks

All contributions are welcome!

[formik](https://github.com/jaredpalmer/formik)