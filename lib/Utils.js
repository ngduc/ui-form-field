"use strict";
exports.__esModule = true;
var React = require("react");
exports.animals = [
    { value: '', label: 'Select an animal' },
    { value: 'TIGER', label: 'Tiger' },
    { value: 'BEAR', label: 'Bear' }
];
exports.genders = [
    { value: '', label: 'N/A' },
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' }
];
exports.roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'USER', label: 'User' }
];
// similar to Storybook "action()"
function log(name) {
    return function (val) {
        console.log(name, val);
    };
}
exports.log = log;
// combine class names - cn(props.className, more.className ...)
function cn() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var classNameStr = '';
    for (var i = 0; i < items.length; i += 1) {
        classNameStr += (items[i] ? ' ' + items[i] : '');
    }
    return classNameStr;
}
exports.cn = cn;
function clone(obj) {
    if (!obj) {
        return null;
    }
    return JSON.parse(JSON.stringify(obj));
}
exports.clone = clone;
// for shorthand syntax, extract { label, placeholder, name } from children string
// example: <Field>label | placeholder | name</Field>
exports.getChildrenParts = function (props) {
    var children = props.children;
    var isJSXString = Array.isArray(props.children) && children.join('').indexOf('|') >= 0;
    if (isJSXString) {
        // children can be: {role.label} | roles (which is not a string => join it to have a string)
        children = children.join('');
    }
    if ((typeof props.children === 'string' && props.children.indexOf('|') >= 0) || isJSXString) {
        var arr = children.split('|').map(function (item) { return item.trim(); });
        var label_1 = arr[0];
        var fieldName = arr[arr.length - 1];
        var placeholder_1 = arr.length === 3 ? arr[1] : '';
        return { label: label_1, placeholder: placeholder_1, fieldName: fieldName };
    }
    var label = props.label, placeholder = props.placeholder, name = props.name;
    return { label: label, placeholder: placeholder, fieldName: name };
};
exports.DisplayFormState = function (props) { return (React.createElement("div", { style: { margin: '1rem 0' } },
    React.createElement("h3", { style: { fontFamily: 'monospace' } }),
    React.createElement("pre", { style: {
            background: '#f6f8fa',
            fontSize: '.65rem',
            padding: '.5rem'
        } },
        React.createElement("strong", null, "values"),
        " = ",
        JSON.stringify(props.values, null, 2)))); };
// check if variable is an array of options (for select)
exports.isOptionArray = function (v) {
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i += 1) {
            if (!v[i].hasOwnProperty('value')) {
                return false; // all array items must have "value"
            }
        }
        return true; // Note: empty array => also true
    }
    return false;
};
// delete multiple properties from data
function deleteProperties(data, properties) {
    for (var i = 0; i < properties.length; i += 1) {
        if (data.hasOwnProperty(properties[i])) {
            delete data[properties[i]];
        }
    }
}
exports.deleteProperties = deleteProperties;
function toPascalCase(s) {
    if (!s) {
        return '';
    }
    return s.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });
}
exports.toPascalCase = toPascalCase;
