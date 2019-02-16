import * as React from 'react';
import { connect, Field, FastField } from 'formik';
import Toggle from 'react-toggle';
import * as ReactTags from 'react-tag-autocomplete'
import { cn, getChildrenParts, isOptionArray, toPascalCase, } from './Utils'
import * as _get from 'lodash.get'

const getClasses = (use: string, isHorizontal: boolean) => {
  const defaults = {
    group: '',
    label: 'ui-label',
    control: 'ui-field',
    row: 'ui-row',
    file: 'ui-field',
    toggle: 'ui-toggle',
    invalidControl: 'ui-field-error',
    error: 'ui-error',
    help: 'ui-help'
  };
  if (use === 'bootstrap3' || use === 'bootstrap4') {
    defaults.group =
      'form-group' + (isHorizontal ? ' row' : '') + ''
    defaults.control = 'form-control';
    defaults.row = 'form-row';
    defaults.file = 'ui-field ui-bootstrap-file';
    defaults.toggle = 'ui-bootstrap-toggle'; // custom css for bootstrap
    defaults.invalidControl = 'is-invalid';
    defaults.error = 'invalid-feedback';
    defaults.help = 'form-text text-muted';
  }
  if (use === 'spectre') {
    defaults.group = 'form-group';
    defaults.label = 'form-label form-inline';
    defaults.control = 'form-input';
    defaults.row = 'input-group';
    // defaults.toggle = 'ui-spectre-toggle'; // no need yet
    defaults.invalidControl = 'is-error';
    defaults.error = 'form-input-hint';
  }
  if (use === 'semanticui2') {
    defaults.group = isHorizontal ? 'field inline' : 'field';
    defaults.row = 'equal width fields';
    defaults.file = 'ui-field ui-semanticui2-file';
    defaults.toggle = 'ui-semanticui2-toggle';
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

function UIToggle(props: any) {
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

    return (<img src={thumb} alt={file.name} className="ui-thumb" />);
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

interface UIFieldProps {
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
  tagSelect?: string|boolean
  options?: any[]
  toggle?: string|boolean
  inline?: string|boolean
  textarea?: string|boolean
  file?: string|boolean
  withPreview?: string|boolean
  renderField?: (props?: any) => void
  // --- handlers:
  value?: any
  onChange?: (val: any) => void
  disabled?: boolean
  validate?: any // TODO: use correct type
  children?: any
  formik?: any
}

const UIField = (props: UIFieldProps) => {
  const { label, placeholder, fieldName } = getChildrenParts(props)
  const labelText = label || toPascalCase(fieldName);

  const errors = props.formik.errors;
  const hasErrors =
    _get(props.formik.errors, fieldName) &&
    (_get(props.formik.touched, fieldName) || props.formik.submitCount > 0)

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
  const Label = (props: any) => (
    <label htmlFor={props.for || fieldName} className={labelClass}>
      {labelText}
    </label>
  )
  const ErrorMessage = () =>
    hasErrors ? (
      <span className={errorClass}>{_get(errors, fieldName)}</span>
    ) : null

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
  const mainClassName = classes.group + cn(props.className)

  if (props.select) {
    // --- native select: (we need customization & search => use SearchableSelect)
    moreProps.key = `fieldkey_${+new Date()}`
    moreProps.component = 'select'
  }
  ;['number', 'password', 'date', 'time', 'range'].map(type => {
    if (props.hasOwnProperty(type)) {
      moreProps.type = type // HTML5 input types
    }
  })

  // ------ render <Field row .../>
  if (props.row) {
    return (
      <div className={mainClassName}>
        <Row {...commonProps} className={rowClass}>
          {props.children}
        </Row>
      </div>
    )
  }
  // ------ render <Field toggle .../>
  if (props.toggle) {
    return (
      <div className={mainClassName}>
        <Label/>
        <UIToggle
          {...commonProps}
          className={props.inline ? `${toggleClass}-inline` : toggleClass}
        />
        <ErrorMessage/>
      </div>
    )
  }
  // ------ render <Field file .../>
  if (props.file) {
    return (
      <div className={mainClassName}>
        <Label/>
        <FileUpload
          {...commonProps}
          withPreview={props.withPreview}
          className={`${fileClass} ${hasErrors ? classes.invalidControl : ''}`}
        />
        <ErrorMessage/>
      </div>
    )
  }
  // ------ render <Field checkbox .../> - form value has Boolean Type (true/false)
  if (props.checkbox && typeof props.value === 'undefined') {
    const randomId = `id_${Math.random().toString().slice(2)}`
    const val = props.formik.values[fieldName]
    const disabled = props.disabled
    return (
      <div
        className={`${mainClassName} ${
          disabled ? 'ui-field-disabled' : ''
          }`}
      >
        <input
          type="checkbox"
          id={randomId}
          disabled={disabled}
          name={fieldName}
          checked={!!val}
          onChange={(ev: any) => {
            const val = ev.target.checked
            props.formik.setFieldValue(fieldName, val)
            props.onChange && props.onChange(val)
          }}
        />
        &nbsp;
        <Label for={randomId}/>
        <small className={helpClass}>{props.help}</small>
        <ErrorMessage/>
      </div>
    )
  }
  // ------ render <Field checkbox value .../> - checkbox has value prop => form value has Array Type
  if (props.checkbox && typeof props.value !== 'undefined') {
    return (
      <div className={mainClassName}>
        <Checkbox {...commonProps} />
      </div>
    )
  }
  // ------ render <Field checkboxes options={} .../>
  if (props.checkboxes && props.options) {
    return (
      <div className={mainClassName}>
        <Label/>
        <div
          className={`ui-field-full ${hasErrors ? classes.invalidControl : ''}`}
        >
          {props.options.map((opt: any) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              name={fieldName}
              value={opt.value}
              onChange={props.onChange}
            />
          ))}
        </div>
        <ErrorMessage/>
      </div>
    )
  }
  // ------ radio <Field radio .../>
  if (props.radio) {
    return (
      <div className={mainClassName}>
        <Radio {...commonProps} />
      </div>
    )
  }
  // ------ radios <Field radios options={} .../>
  if (props.radios && props.options) {
    return (
      <div className={mainClassName}>
        <Label/>
        <div
          className={`ui-field-full ${hasErrors ? classes.invalidControl : ''}`}
        >
          {props.options.map((opt: any) => (
            <Radio
              key={opt.value}
              label={opt.label}
              name={fieldName}
              value={opt.value}
              onChange={props.onChange}
            />
          ))}
        </div>
        <ErrorMessage/>
      </div>
    )
  }
  // ------ render custom field <Field renderField={(props) => <ReactSelect ... />}   </Field>
  if (props.renderField) {
    return (
      <div className={mainClassName}>
        <Label/>
        {props.renderField(props)}
        <small className={helpClass}>{props.help}</small>
        <ErrorMessage/>
      </div>
    )
  }
  // ------ render multi select <Field multiSelect options={} .../>
  // if (props.multiSelect) {
  //   return (
  //     <div className={mainClassName}>
  //       <Label/>
  //       <MultiSelect {...props} />
  //       <small className={helpClass}>{props.help}</small>
  //       <ErrorMessage/>
  //     </div>
  //   )
  // }

  if (props.tagSelect) {
    const values = props.formik.values[fieldName] || []
    const { options = [] } = clonedProps
    delete clonedProps.className

    const tags = values.map((id: string) => {
      const selectedOption = options['find'](option => (option.value === id))
      if (selectedOption) {
        return {
          id: selectedOption.value,
          name: selectedOption.label,
        }
      } else {
        return {
          id,
          name: id,
        }
      }
    })
    const suggestions = options.map(({ label, value }) => ({ id: value, name: label }))
    return (
      <div className={mainClassName}>
        <Label/>
        <ReactTags
          addOnBlur={true}
          allowNew={true}
          allowBackspace={true}
          autofocus={false}
          minQueryLength={0}
          tags={tags}
          placeholder={placeholder}
          suggestions={suggestions}
          handleValidate={({ name }: { name: string }) => name.length}
          handleAddition={({ name }: { name: string }) => {
            const foundOpt = options['find'](option => (option.label === name))
            values.push(foundOpt ? foundOpt.value : name)
            props.formik.setFieldValue(fieldName, values)
            props.onChange && props.onChange(values)
          }}
          handleDelete={(index: number) => {
            values.splice(index, 1)
            props.formik.setFieldValue(fieldName, values)
            props.onChange && props.onChange(values)
          }}

          {...clonedProps}
        />
        <small className={helpClass}>{props.help}</small>
        <ErrorMessage/>
      </div>
    )
  }

  // ------ regular field
  delete clonedProps.onChange // otherwise it will override the FastField onChange handler below.
  return (
    <div className={mainClassName}>
      <Label/>
      <FastField
        name={fieldName}
        placeholder={placeholder}
        onChange={(ev: React.ChangeEvent<any>) => {
          props.formik.handleChange(ev)
          if (_get(ev, 'nativeEvent.target.tagName') === 'INPUT') {
            props.onChange &&
            props.onChange(_get(ev, 'nativeEvent.target.value')) // input's value
          } else {
            props.onChange && props.onChange(ev) // generic event
          }
        }}
        validate={props.validate}
        {...clonedProps}
        {...moreProps}
        className={`${controlClass} ${hasErrors ? classes.invalidControl : ''}`}
      >
        {options}
      </FastField>
      <small className={helpClass}>{props.help}</small>

      <ErrorMessage/>
    </div>
  )
};
export default connect(UIField);
