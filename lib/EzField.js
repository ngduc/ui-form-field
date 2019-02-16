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
var Utils_1 = require("./Utils");
var getClasses = function (use, isHorizontal) {
    var defaults = {
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
                    props.onChange && props.onChange(nextValue);
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
                    props.onChange && props.onChange(props.value);
                } })),
            "\u00A0",
            props.label));
    }));
}
function EzToggle(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        var formVal = form.values[props.name]; // field value form formik.values
        var checked = typeof formVal !== 'undefined' ? formVal : false;
        return (React.createElement(react_toggle_1["default"], __assign({ icons: false }, props, { checked: checked, onChange: function (e) {
                form.setFieldValue(props.name, e.target.checked);
                props.onChange && props.onChange(e.target.checked);
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
        return (React.createElement("img", { src: thumb, alt: file.name, className: "ez-thumb" }));
    };
    return Thumb;
}(React.Component));
function FileUpload(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement(React.Fragment, null,
            React.createElement("input", { id: props.id || props.name, name: props.name, type: "file", className: props.className || '', onChange: function (event) {
                    form.setFieldValue(props.name, event.currentTarget.files[0]);
                    props.onChange && props.onChange(event.currentTarget.files[0]);
                } }),
            props.withPreview && React.createElement(Thumb, { file: form.values[props.name] })));
    }));
}
function Row(props) {
    function renderChildren() {
        return React.Children.map(props.children, function (child) {
            return React.cloneElement(child, {
                className: "col-md-6"
            });
        });
    }
    return (React.createElement("div", { className: props.className }, renderChildren()));
}
var EzField = function (props) {
    var _a = Utils_1.getChildrenParts(props), label = _a.label, placeholder = _a.placeholder, fieldName = _a.fieldName;
    var labelText = label || Utils_1.toPascalCase(fieldName);
    var errors = props.formik.errors;
    var hasErrors = props.formik.errors.hasOwnProperty(fieldName) &&
        (props.formik.touched.hasOwnProperty(fieldName) || props.formik.submitCount > 0);
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
        options = props.options.map(function (opt) { return React.createElement("option", { key: opt.value, value: opt.value }, opt.label); });
    }
    var Label = function () { return React.createElement("label", { htmlFor: fieldName, className: labelClass }, labelText); };
    var clonedProps = __assign({}, props);
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
    if (props.select) {
        moreProps.component = 'select';
    }
    ['number', 'password', 'date', 'time', 'range'].map(function (type) {
        if (props.hasOwnProperty(type)) {
            moreProps.type = type; // HTML5 input types
        }
    });
    return (React.createElement("div", { className: classes.group + Utils_1.cn(props.className) },
        props.row ? (React.createElement(Row, __assign({}, commonProps, { className: rowClass }), props.children)) : props.toggle ? (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement(EzToggle, __assign({}, commonProps, { className: props.inline ? toggleClass + "-inline" : toggleClass })))) : props.file ? (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement(FileUpload, __assign({}, commonProps, { withPreview: props.withPreview, className: fileClass + " " + (hasErrors ? classes.invalidControl : '') })))) : props.checkbox ? (React.createElement(Checkbox, __assign({}, commonProps))) : props.radio ? (React.createElement(Radio, __assign({}, commonProps))) : (props.radios && props.options) ? (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement("div", { className: "ez-field-full " + (hasErrors ? classes.invalidControl : '') }, props.options.map(function (opt) { return (React.createElement(Radio, { key: opt.value, label: opt.label, name: fieldName, value: opt.value, onChange: props.onChange })); })))) : (props.checkboxes && props.options) ? (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement("div", { className: "ez-field-full " + (hasErrors ? classes.invalidControl : '') }, props.options.map(function (opt) { return (React.createElement(Checkbox, { key: opt.value, label: opt.label, name: fieldName, value: opt.value, onChange: props.onChange })); })))) : (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement(formik_1.FastField, __assign({ name: fieldName, placeholder: placeholder, onChange: function (val) { props.formik.handleChange(val); props.onChange && props.onChange(val); }, validate: props.validate }, (typeof props.children !== 'string' ? clonedProps : {}), moreProps, { className: controlClass + " " + (hasErrors ? classes.invalidControl : '') }), options),
            React.createElement("small", { className: helpClass }, props.help))),
        hasErrors && React.createElement("span", { className: errorClass }, errors[fieldName])));
};
exports["default"] = formik_1.connect(EzField);
