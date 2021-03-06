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
exports.__esModule = true;
var React = require("react");
var react_select_1 = require("react-select");
var Utils_1 = require("../Utils");
var SingleSelect = /** @class */ (function (_super) {
    __extends(SingleSelect, _super);
    function SingleSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleSelect.prototype.componentWillMount = function () {
        this.triggerOnChange(this.props);
    };
    SingleSelect.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props.options !== newProps.options) {
            // trigger onChange when "options" changed (after fetching & setting options)
            this.triggerOnChange(newProps);
        }
    };
    SingleSelect.prototype.triggerOnChange = function (newProps) {
        if (!newProps.autoOnChange || newProps.autoOnChange === false) {
            return; // for backward compatibility, this prop will not trigger onChange when options changed.
        }
        var fieldName = newProps.name;
        var val = Utils_1.deepFind(newProps.formik.values, fieldName);
        // from the value => look up to find changedItem { label, value } to trigger onChange
        if (newProps.options && Array.isArray(newProps.options)) {
            var changedItem = newProps.options.find(function (opt) { return opt.value === val; });
            if (changedItem && newProps.onChange) {
                newProps.onChange({ item: changedItem, formik: newProps.formik });
            }
        }
    };
    SingleSelect.prototype.render = function () {
        var _this = this;
        var fieldName = this.props.name;
        var options = this.props.options || [];
        var values = this.props.formik.values;
        var disabled = this.props.disabled;
        // required for testing to identify the field
        // const classFieldName = `__${this.props.name.split('.').join('-')}`
        var placeholder = options && options[0] && options[0].label === 'Loading...' ? 'Loading...' : this.props.placeholder || 'Select';
        if (!options || options.length === 0) {
            placeholder = '';
        }
        var val = Utils_1.deepFind(values, fieldName);
        var selectedOpt = options['find'](function (opt) { return opt.value === val; });
        // className={`${css.main} ${classFieldName}`}
        return (React.createElement(react_select_1["default"], { className: this.props.className, isClearable: true, value: selectedOpt, placeholder: placeholder, options: options, disabled: disabled, searchable: options && options.length > 5 ? true : false, onChange: function (item) {
                _this.props.formik.setFieldValue(fieldName, item ? item.value : '');
                _this.props.onChange && _this.props.onChange({ item: item, formik: _this.props.formik });
            } }));
    };
    return SingleSelect;
}(React.Component));
exports["default"] = SingleSelect;
