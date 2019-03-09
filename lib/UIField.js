"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var formik_1 = require("formik");
var react_toggle_1 = require("react-toggle");
var ReactTags = require("react-tag-autocomplete");
var Utils_1 = require("./Utils");
var _get = require("lodash.get");
// import SingleSelect from './custom/SingleSelect'; // requires 'react-select' => increase bundle size
// import MultiSelect from './custom/MultiSelect'; // requires 'react-select' => increase bundle size
var getClasses = function (use, isHorizontal) {
    var defaults = {
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
        defaults.group = 'form-group' + (isHorizontal ? ' row' : '') + '';
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
function Checkbox(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement("label", null,
            React.createElement("input", __assign({ type: "checkbox" }, props, { checked: field.value && field.value.includes(props.value), onChange: function () {
                    var nextValue;
                    field.value = field.value || [];
                    if (field.value.includes(props.value)) {
                        nextValue = field.value.filter(function (value) { return value !== props.value; });
                        form.setFieldValue(props.name, nextValue);
                    }
                    else {
                        nextValue = field.value.concat(props.value);
                        form.setFieldValue(props.name, nextValue);
                    }
                    props.onChange && props.onChange({ value: nextValue, formik: form });
                } })),
            "\u00A0",
            props.label));
    }));
}
function Radio(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement("label", null,
            React.createElement("input", __assign({ type: "radio" }, props, { checked: field.value === props.value, onChange: function () {
                    form.setFieldValue(props.name, props.value);
                    props.onChange && props.onChange({ value: props.value, formik: form });
                } })),
            "\u00A0",
            props.label));
    }));
}
function UIToggle(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        var formVal = form.values[props.name]; // field value form formik.values
        var checked = typeof formVal !== 'undefined' ? formVal : false;
        return (React.createElement(react_toggle_1["default"], __assign({ icons: false }, props, { checked: checked, onChange: function (e) {
                form.setFieldValue(props.name, e.target.checked);
                props.onChange && props.onChange({ value: e.target.checked, event: e, formik: form });
            } })));
    }));
}
var Thumb = /** @class */ (function (_super) {
    __extends(Thumb, _super);
    function Thumb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false,
            thumb: undefined
        };
        return _this;
    }
    Thumb.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (!nextProps.file) {
            return;
        }
        this.setState({ loading: true }, function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                _this.setState({ loading: false, thumb: reader.result });
            };
            reader.readAsDataURL(nextProps.file);
        });
    };
    Thumb.prototype.render = function () {
        var file = this.props.file;
        var _a = this.state, loading = _a.loading, thumb = _a.thumb;
        if (!file) {
            return null;
        }
        // if (loading) { return <p>loading...</p>; } // this causes flickering when changing other fields.
        return React.createElement("img", { src: thumb, alt: file.name, className: "ui-thumb" });
    };
    return Thumb;
}(React.Component));
function FileUpload(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement(React.Fragment, null,
            React.createElement("input", { id: props.id || props.name, name: props.name, type: "file", className: props.className || '', onChange: function (event) {
                    form.setFieldValue(props.name, event.currentTarget.files[0]);
                    props.onChange && props.onChange({ value: event.currentTarget.files[0], event: event, formik: form });
                } }),
            props.withPreview && React.createElement(Thumb, { file: form.values[props.name] })));
    }));
}
function Row(props) {
    function renderChildren() {
        return React.Children.map(props.children, function (child, index) {
            return React.cloneElement(child, {
                key: index,
                className: 'col-md-6'
            });
        });
    }
    return React.createElement("div", { className: props.className }, renderChildren());
}
var UIField = function (props) {
    var _a = Utils_1.getChildrenParts(props), label = _a.label, placeholder = _a.placeholder, fieldName = _a.fieldName;
    var labelText = label || Utils_1.toPascalCase(fieldName);
    var errors = props.formik.errors;
    var touched = _get(props.formik.touched, fieldName);
    var isTouched = Array.isArray(touched) ? false : touched;
    var hasErrors = _get(props.formik.errors, fieldName) && (isTouched || props.formik.submitCount > 0);
    var classes = getClasses(props.formik.ezUse, props.formik.ezHorizontal);
    var css = props.formik.ezCss || {};
    var labelCss = css.label || props.labelCss || '';
    var labelClass = labelCss ? classes.label + " " + labelCss : classes.label;
    var controlCss = css.control || props.controlCss || '';
    var controlClass = Utils_1.cn(classes.control, controlCss);
    var toggleCss = css.toggle || props.toggleCss || '';
    var toggleClass = Utils_1.cn(classes.toggle, toggleCss);
    var fileCss = css.file || props.fileCss || '';
    var fileClass = Utils_1.cn(classes.file, fileCss);
    var rowCss = css.row || props.rowCss || '';
    var rowClass = Utils_1.cn(classes.row, rowCss);
    var errorCss = css.error || props.errorCss || '';
    var errorClass = Utils_1.cn(classes.error, errorCss);
    var helpCss = css.help || props.helpCss || '';
    var helpClass = Utils_1.cn(classes.help, helpCss);
    var options = null;
    if (Utils_1.isOptionArray(props.options)) {
        options = props.options.map(function (opt) { return (React.createElement("option", { key: opt.value, value: opt.value }, opt.label)); });
    }
    var Label = function (compProps) {
        if (props.label === '') {
            return React.createElement("label", { htmlFor: compProps["for"] || fieldName, className: labelClass });
        }
        if (props.label === null) {
            return null;
        }
        return (React.createElement("label", { htmlFor: compProps["for"] || fieldName, className: labelClass }, labelText));
    };
    var ErrorMessage = function () {
        return hasErrors ? React.createElement("span", { className: errorClass }, _get(errors, fieldName)) : null;
    };
    var clonedProps = __assign({}, props
    // className: '' // don't pass props.className to children
    );
    var commonProps = {
        label: labelText,
        name: fieldName,
        value: props.value,
        onChange: props.onChange
    };
    var moreProps = {};
    if (props.textarea) {
        moreProps.component = 'textarea';
    }
    var mainClassName = classes.group + Utils_1.cn(props.className);
    if (props.select) {
        // --- native select: (we need customization & search => use SearchableSelect)
        moreProps.key = "fieldkey_" + +new Date();
        moreProps.component = 'select';
    }
    ['number', 'password', 'date', 'time', 'range'].map(function (type) {
        if (props.hasOwnProperty(type)) {
            moreProps.type = type; // HTML5 input types
        }
    });
    if (props.custom) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            React.createElement(props.custom, __assign({}, props, { className: "" + (hasErrors ? classes.invalidControl : '') })),
            React.createElement("small", { className: helpClass }, props.help),
            React.createElement(ErrorMessage, null)));
    }
    /*
    // --- singleSelect & multiSelect increase bundle size => let user import them when needed.
    if (props.singleSelect) {
      return (
        <div className={mainClassName}>
          <Label/>
          <SingleSelect {...props} className={`${hasErrors ? classes.invalidControl : ''}`} />
          <small className={helpClass}>{props.help}</small>
          <ErrorMessage/>
        </div>
      )
    }
  
    if (props.multiSelect) {
      return (
        <div className={mainClassName}>
          <Label/>
          <MultiSelect {...props} className={`${hasErrors ? classes.invalidControl : ''}`} />
          <small className={helpClass}>{props.help}</small>
          <ErrorMessage/>
        </div>
      )
    } */
    // ------ render <Field row .../>
    if (props.row) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Row, __assign({}, commonProps, { className: rowClass }), props.children)));
    }
    // ------ render <Field toggle .../>
    if (props.toggle) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            React.createElement(UIToggle, __assign({}, commonProps, { className: props.inline ? toggleClass + "-inline" : toggleClass })),
            React.createElement(ErrorMessage, null)));
    }
    // ------ render <Field file .../>
    if (props.file) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            React.createElement(FileUpload, __assign({}, commonProps, { withPreview: props.withPreview, className: fileClass + " " + (hasErrors ? classes.invalidControl : '') })),
            React.createElement(ErrorMessage, null)));
    }
    // ------ render <Field checkbox .../> - form value has Boolean Type (true/false)
    if (props.checkbox && typeof props.value === 'undefined') {
        var randomId = "id_" + Math.random()
            .toString()
            .slice(2);
        var val = props.formik.values[fieldName];
        var disabled = props.disabled;
        return (React.createElement("div", { className: mainClassName + " " + (disabled ? 'ui-field-disabled' : '') },
            React.createElement("input", { type: "checkbox", id: randomId, disabled: disabled, name: fieldName, checked: !!val, onChange: function (ev) {
                    var val = ev.target.checked;
                    props.formik.setFieldValue(fieldName, val);
                    props.onChange && props.onChange({ value: val, event: ev, formik: props.formik });
                } }),
            "\u00A0",
            React.createElement(Label, { "for": randomId }),
            React.createElement("small", { className: helpClass }, props.help),
            React.createElement(ErrorMessage, null)));
    }
    // ------ render <Field checkbox value .../> - checkbox has value prop => form value has Array Type
    if (props.checkbox && typeof props.value !== 'undefined') {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Checkbox, __assign({}, commonProps))));
    }
    // ------ render <Field checkboxes options={} .../>
    if (props.checkboxes && props.options) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            React.createElement("div", { className: "ui-field-full " + (hasErrors ? classes.invalidControl : '') }, props.options.map(function (opt) { return (React.createElement(Checkbox, { key: opt.value, label: opt.label, name: fieldName, value: opt.value, onChange: props.onChange })); })),
            React.createElement(ErrorMessage, null)));
    }
    // ------ radio <Field radio .../>
    if (props.radio) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Radio, __assign({}, commonProps))));
    }
    // ------ radios <Field radios options={} .../>
    if (props.radios && props.options) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            React.createElement("div", { className: "ui-field-full " + (hasErrors ? classes.invalidControl : '') }, props.options.map(function (opt) { return (React.createElement(Radio, { key: opt.value, label: opt.label, name: fieldName, value: opt.value, onChange: props.onChange })); })),
            React.createElement(ErrorMessage, null)));
    }
    // ------ render custom field <Field renderField={(props) => <ReactSelect ... />}   </Field>
    if (props.renderField) {
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            props.renderField(props),
            React.createElement("small", { className: helpClass }, props.help),
            React.createElement(ErrorMessage, null)));
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
        var values_1 = props.formik.values[fieldName] || [];
        var _b = clonedProps.options, options_1 = _b === void 0 ? [] : _b;
        delete clonedProps.className;
        var tags = values_1.map(function (id) {
            var selectedOption = options_1['find'](function (option) { return option.value === id; });
            if (selectedOption) {
                return {
                    id: selectedOption.value,
                    name: selectedOption.label
                };
            }
            else {
                return {
                    id: id,
                    name: id
                };
            }
        });
        var suggestions = options_1.map(function (_a) {
            var label = _a.label, value = _a.value;
            return ({ id: value, name: label });
        });
        return (React.createElement("div", { className: mainClassName },
            React.createElement(Label, null),
            React.createElement(ReactTags, __assign({ addOnBlur: true, allowNew: true, allowBackspace: true, autofocus: false, minQueryLength: 0, tags: tags, placeholder: placeholder, suggestions: suggestions, handleValidate: function (_a) {
                    var name = _a.name;
                    return name.length;
                }, handleAddition: function (_a) {
                    var name = _a.name;
                    var foundOpt = options_1['find'](function (option) { return option.label === name; });
                    var changedValue = foundOpt ? foundOpt.value : name;
                    values_1.push(changedValue);
                    props.formik.setFieldValue(fieldName, values_1);
                    props.onChange && props.onChange({ value: changedValue, formik: props.formik });
                }, handleDelete: function (index) {
                    values_1.splice(index, 1);
                    props.formik.setFieldValue(fieldName, values_1);
                    props.onChange && props.onChange({ formik: props.formik, index: index });
                } }, clonedProps)),
            React.createElement("small", { className: helpClass }, props.help),
            React.createElement(ErrorMessage, null)));
    }
    // ------ regular field
    delete clonedProps.onChange; // otherwise it will override the FastField onChange handler below.
    // delete to avoid react warning (it requires passing select="true", not shorthands like select, etc.)
    Utils_1.deleteProperties(clonedProps, ['select', 'number', 'password', 'date', 'time', 'range', 'textarea']);
    return (React.createElement("div", { className: mainClassName },
        React.createElement(Label, null),
        React.createElement(formik_1.FastField, __assign({ name: fieldName, placeholder: placeholder, onChange: function (ev) {
                props.formik.handleChange(ev);
                if (_get(ev, 'nativeEvent.target.tagName') === 'INPUT') {
                    props.onChange &&
                        props.onChange({ value: _get(ev, 'nativeEvent.target.value'), event: ev, formik: props.formik }); // input's value
                }
                else {
                    props.onChange && props.onChange({ event: ev, formik: props.formik }); // generic event
                }
            }, validate: props.validate }, clonedProps, moreProps, { className: controlClass + " " + (hasErrors ? classes.invalidControl : '') }), options),
        React.createElement("small", { className: helpClass }, props.help),
        React.createElement(ErrorMessage, null)));
};
exports["default"] = formik_1.connect(UIField);
