"use strict";
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
var ReactTags = require("react-tag-autocomplete");
function TagSelect(props) {
    var formik = props.formik, onChange = props.onChange, fieldName = props.fieldName, placeholder = props.placeholder;
    var clonedProps = __assign({}, props);
    var values = formik.values[fieldName] || [];
    var _a = clonedProps.options, options = _a === void 0 ? [] : _a;
    delete clonedProps.className;
    var tags = values.map(function (id) {
        var selectedOption = options['find'](function (option) { return option.value === id; });
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
    var suggestions = options.map(function (opt) { return ({ id: opt.value, name: opt.label }); });
    return (React.createElement(ReactTags, __assign({ addOnBlur: true, allowNew: true, allowBackspace: true, autofocus: false, minQueryLength: 0, tags: tags, placeholder: placeholder, suggestions: suggestions, handleValidate: function (_a) {
            var name = _a.name;
            return name.length;
        }, handleAddition: function (_a) {
            var name = _a.name;
            var foundOpt = options['find'](function (option) { return option.label === name; });
            var changedValue = foundOpt ? foundOpt.value : name;
            values.push(changedValue);
            formik.setFieldValue(fieldName, values);
            onChange && onChange({ value: changedValue, formik: formik });
        }, handleDelete: function (index) {
            values.splice(index, 1);
            formik.setFieldValue(fieldName, values);
            onChange && onChange({ formik: formik, index: index });
        } }, clonedProps)));
}
exports["default"] = TagSelect;
