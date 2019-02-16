import * as React from 'react';
import { connect, Field, FastField } from 'formik';
import Toggle from 'react-toggle';
import { cn, getChildrenParts, isOptionArray, toPascalCase, } from './Utils'

const getClasses = (use: string, isHorizontal: boolean) => {
  const defaults = {
    group: '',
    label: 'ez-label',
    control: 'ez-field',
    row: 'ez-row',
    file: 'ez-field',
    toggle: 'ez-toggle',
    invalidControl: 'ez-field-error',
    error: 'ez-error',
    help: 'ez-help'
  };
  if (use === 'bootstrap3' || use === 'bootstrap4') {
    defaults.group = 'form-group' + (isHorizontal ? ' row' : '');
    defaults.control = 'form-control';
    defaults.row = 'form-row';
    defaults.file = 'ez-field ez-bootstrap-file';
    defaults.toggle = 'ez-bootstrap-toggle'; // custom css for bootstrap
    defaults.invalidControl = 'is-invalid';
    defaults.error = 'invalid-feedback';
    defaults.help = 'form-text text-muted';
  }
  if (use === 'spectre') {
    defaults.group = 'form-group';
    defaults.label = 'form-label form-inline';
    defaults.control = 'form-input';
    defaults.row = 'input-group';
    // defaults.toggle = 'ez-spectre-toggle'; // no need yet
    defaults.invalidControl = 'is-error';
    defaults.error = 'form-input-hint';
  }
  if (use === 'semanticui2') {
    defaults.group = isHorizontal ? 'field inline' : 'field';
    defaults.row = 'equal width fields';
    defaults.file = 'ez-field ez-semanticui2-file';
    defaults.toggle = 'ez-semanticui2-toggle';
  }
  return defaults;
};

function Checkbox(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value && field.value.includes(props.value)}
            onChange={() => {
              let nextValue
              field.value = field.value || []
              if (field.value.includes(props.value)) {
                nextValue = field.value.filter(
                  (value: any) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
              props.onChange && props.onChange(nextValue);
            }}
          />
          &nbsp;
          {props.label}
        </label>
      )}
    </Field>
  );
}

function Radio(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => {
        return (
          <label>
            <input
              type="radio"
              {...props}
              checked={field.value === props.value}
              onChange={() => {
                form.setFieldValue(props.name, props.value);
                props.onChange && props.onChange(props.value);
              }}
            />
            &nbsp;
            {props.label}
          </label>
        )
      }}
    </Field>
  );
}

function EzToggle(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => {
        const formVal = form.values[props.name] // field value form formik.values
        const checked = typeof formVal !== 'undefined' ? formVal : false
        return (
          <Toggle
            icons={false}
            {...props}
            checked={checked}
            onChange={(e: any) => {
              form.setFieldValue(props.name, e.target.checked);
              props.onChange && props.onChange(e.target.checked);
            }}
          />
        )
      }}
    </Field>
  );
}

interface IThumb {
  file: any
}
class Thumb extends React.Component<IThumb> {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps: any) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const file = this.props.file;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    // if (loading) { return <p>loading...</p>; } // this causes flickering when changing other fields.

    return (<img src={thumb} alt={file.name} className="ez-thumb" />);
  }
}

function FileUpload(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => {
        return (
          <React.Fragment>
            <input id={props.id || props.name} name={props.name} type="file" className={props.className || ''} onChange={(event) => {
              form.setFieldValue(props.name, event.currentTarget.files[0]);
              props.onChange && props.onChange(event.currentTarget.files[0]);
            }} />
            {props.withPreview && <Thumb file={form.values[props.name]} />}
          </React.Fragment>
        )
      }}
    </Field>
  )
}

function Row(props: any) {
  function renderChildren() {
    return React.Children.map(props.children, (child: any) => {
      return React.cloneElement(child, {
        className: "col-md-6"
      })
    })
  }

  return (
    <div className={props.className}>
      {renderChildren()}
    </div>
  )
}

interface EzFieldProps {
  className?: string
  controlCss?: string
  labelCss?: string
  toggleCss?: string
  fileCss?: string
  rowCss?: string
  errorCss?: string
  helpCss?: string
  label?: string|any // TODO: use correct type string|JSX
  placeholder?: string
  name?: string
  help?: string|any
  // --- field types:
  row?: string|boolean
  password?: string|boolean
  number?: string|boolean
  date?: string|boolean
  time?: string|boolean
  range?: string|boolean
  radio?: string|boolean
  radios?: string|boolean
  checkbox?: string|boolean
  checkboxes?: string|boolean
  select?: string|boolean
  options?: any[]
  toggle?: string|boolean
  inline?: string|boolean
  textarea?: string|boolean
  file?: string|boolean
  withPreview?: string|boolean
  // --- handlers:
  value?: any
  onChange?: (val: any) => void
  validate?: any // TODO: use correct type
  children?: any
  formik?: any
}

const EzField = (props: EzFieldProps) => {
  const { label, placeholder, fieldName } = getChildrenParts(props)
  const labelText = label || toPascalCase(fieldName);

  const errors = props.formik.errors;
  const hasErrors =
    props.formik.errors.hasOwnProperty(fieldName) &&
    (props.formik.touched.hasOwnProperty(fieldName) || props.formik.submitCount > 0);

  const classes = getClasses(props.formik.ezUse, props.formik.ezHorizontal);
  const css = props.formik.ezCss || {}
  const labelCss = css.label || props.labelCss || ''
  const labelClass = labelCss ? `${classes.label} ${labelCss}` : classes.label

  const controlCss = css.control || props.controlCss || ''
  const controlClass = cn(classes.control, controlCss)

  const toggleCss = css.toggle || props.toggleCss || ''
  const toggleClass =  cn(classes.toggle, toggleCss)

  const fileCss = css.file || props.fileCss || ''
  const fileClass = cn(classes.file, fileCss)

  const rowCss = css.row || props.rowCss || ''
  const rowClass = cn(classes.row, rowCss)

  const errorCss = css.error || props.errorCss || ''
  const errorClass = cn(classes.error, errorCss)

  const helpCss = css.help || props.helpCss || ''
  const helpClass = cn(classes.help, helpCss)

  let options = null
  if (isOptionArray(props.options)) {
    options = props.options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)
  }
  const Label = () => <label htmlFor={fieldName} className={labelClass}>
    {labelText}
  </label>

  const clonedProps = {
    ...props,
    // className: '' // don't pass props.className to children
  }

  const commonProps: any = {
    label: labelText,
    name: fieldName,
    value: props.value,
    onChange: props.onChange
  }

  const moreProps: any = {}
  if (props.textarea) {
    moreProps.component = 'textarea'
  }
  if (props.select) {
    moreProps.component = 'select'
  }
  ['number', 'password', 'date', 'time', 'range'].map(type => {
    if (props.hasOwnProperty(type)) {
      moreProps.type = type; // HTML5 input types
    }
  })
  return (
    <div className={classes.group + cn(props.className)}>
      {props.row ? (
        <Row {...commonProps} className={rowClass}>
          {props.children}
        </Row>
      ) : props.toggle ? (
        <React.Fragment>
          <Label />
          <EzToggle {...commonProps} className={props.inline ? `${toggleClass}-inline` : toggleClass} />
        </React.Fragment>
      ) : props.file ? (
        <React.Fragment>
          <Label />
          <FileUpload {...commonProps}
            withPreview={props.withPreview} className={`${fileClass} ${hasErrors ? classes.invalidControl : ''}`} />
        </React.Fragment>
      ) : props.checkbox ? (
        <Checkbox {...commonProps} />
      ) : props.radio ? (
        <Radio {...commonProps} />
      ) : (props.radios && props.options) ? (
        <React.Fragment>
          <Label />
          <div className={`ez-field-full ${hasErrors ? classes.invalidControl : ''}`}>
            {props.options.map((opt: any) => (
              <Radio key={opt.value} label={opt.label} name={fieldName} value={opt.value} onChange={props.onChange} />
            ))}
          </div>
        </React.Fragment>
      ) : (props.checkboxes && props.options) ? (
        <React.Fragment>
          <Label />
          <div className={`ez-field-full ${hasErrors ? classes.invalidControl : ''}`}>
            {props.options.map((opt: any) => (
              <Checkbox key={opt.value} label={opt.label} name={fieldName} value={opt.value} onChange={props.onChange} />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Label />
          <FastField
            name={fieldName}
            placeholder={placeholder}
            onChange={(val: any) => { props.formik.handleChange(val); props.onChange && props.onChange(val); }}
            validate={props.validate}
            {...(typeof props.children !== 'string' ? clonedProps : {})}
            {...moreProps}
            className={`${controlClass} ${hasErrors ? classes.invalidControl : ''}`}
          >{options}</FastField>
          <small className={helpClass}>{props.help}</small>
        </React.Fragment>
      )}
      {hasErrors && <span className={errorClass}>{errors[fieldName]}</span>}
    </div>
  );
};
export default connect(EzField);
