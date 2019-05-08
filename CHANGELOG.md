## [1.2.3] - 05/07/2019

### Added
- typescript type files (*.d.ts)
### Changed
- replaced lodash with util functions to reduce bundle size
- upgrade dependencies

## [1.1.5] - 03/08/2019

### Added
- custom type, e.g. <UIField custom={CustomComponent} name="fieldName" />
- formatted code; enabled formatOnSave;
### Changed
- upgraded dependencies
- BREAKING: separated out SingleSelect, MultiSelect (use 'react-select') & TagSelect (use 'react-tag-autocomplete') as custom types to reduce bundle size
  - you need to import to use them separately (see examples).

## [1.0.1] - 2019-02-17

### Added
- first commit - renamed & moved from ez-react-form repo to ui-form-field
- new field types: singleSelect, multiSelect, tagSelect
### Changed
- BREAKING: new handler signature: onChange({ value, formik, event? })

## [0.7.0] - 2018-11-07

### Added
- Field row
- Field help

## [0.6.15] - 2018-11-01

### Added
- more field types: textarea, number, password, file, date, time, range
- toggle & inline toggle
- FieldTypeExample, LayoutExample
- Semantic UI 2

### Changed
- BREAKING: renamed "bootstrap" to "bootstrap4"
- use props instead of shorthand syntax in examples

## [0.4.2] - 2018-10-30

### Added
- storybook
- dynamic form example
- more field types: radios, checkboxes
- updated example

## [0.2.5] - 2018-10-28

### Added
- checkbox, radio, select types

## [0.1.3] - 2018-10-20

### Added
- first working version!
- EzForm, EzField, EzButton
- layout (vertical, horizontal)
- themes (tentcss (default), bootstrap, spectre)
- examples
- ui tests