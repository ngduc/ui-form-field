import * as React from 'react';
import Select from 'react-select';
import { deepFind } from '../Utils';

// import * as css from './SingleSelect.css'
interface IProps {
  className?: string;
  name?: string;
  placeholder?: string;
  options?: any[];
  onChange?: (val: any) => void;
  disabled?: boolean;
  formik?: any; // FormikContext<{}>
}

export default class SingleSelect extends React.Component<IProps> {
  componentWillMount() {
    this.triggerOnChange(this.props);
  }

  componentWillReceiveProps(newProps: any) {
    if (this.props.options !== newProps.options) {
      // trigger onChange when "options" changed (after fetching & setting options)
      this.triggerOnChange(newProps);
    }
  }

  triggerOnChange(newProps: any) {
    if (!newProps.autoOnChange || newProps.autoOnChange === false) {
      return; // for backward compatibility, this prop will not trigger onChange when options changed.
    }
    const fieldName = newProps.name;
    const val = deepFind(newProps.formik.values, fieldName);
    // from the value => look up to find changedItem { label, value } to trigger onChange
    if (newProps.options && Array.isArray(newProps.options)) {
      const changedItem = newProps.options.find((opt: any) => opt.value === val);
      if (changedItem && newProps.onChange) {
        newProps.onChange({ item: changedItem, formik: newProps.formik });
      }
    }
  }

  render() {
    const fieldName = this.props.name;
    const options = this.props.options || [];
    const values = this.props.formik.values;
    const disabled = this.props.disabled;
    // required for testing to identify the field
    // const classFieldName = `__${this.props.name.split('.').join('-')}`
    let placeholder =
      options && options[0] && options[0].label === 'Loading...' ? 'Loading...' : this.props.placeholder || 'Select';
    if (!options || options.length === 0) {
      placeholder = '';
    }
    const val = deepFind(values, fieldName);
    const selectedOpt = options['find'](opt => opt.value === val);
    // className={`${css.main} ${classFieldName}`}
    return (
      <Select
        className={this.props.className}
        isClearable={true}
        value={selectedOpt}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        searchable={options && options.length > 5 ? true : false}
        onChange={(item: any) => {
          this.props.formik.setFieldValue(fieldName, item ? item.value : '');
          this.props.onChange && this.props.onChange({ item, formik: this.props.formik });
        }}
      />
    );
  }
}
