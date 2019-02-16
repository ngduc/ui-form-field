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
var formik_1 = require("formik");
var Utils_1 = require("./Utils");
var getClasses = function (use) {
    var defaults = {
        form: '',
        label: '',
        control: '',
        error: 'left25pct'
    };
    if (use === 'bootstrap3' || use === 'bootstrap4') {
        defaults.label = 'col-sm-3';
        defaults.control = 'col-sm-9';
    }
    if (use === 'spectre') {
        defaults.form = 'form-horizontal';
        defaults.label = 'col-3 col-sm-12';
        defaults.control = 'col-9 col-sm-12';
    }
    if (use === 'semanticui2') {
        defaults.form = 'ui form';
    }
    return defaults;
};
var EzForm = function (props) {
    var classes = getClasses(props.use);
    props.formik.ezUse = props.use; // bootstrap, spectre, etc.
    props.formik.ezHorizontal = typeof props.horizontal !== 'undefined';
    var customCss = Utils_1.clone(props.css);
    if (props.formik.ezHorizontal) {
        customCss.form = customCss.form || classes.form;
        customCss.label = customCss.label || classes.label;
        customCss.control = customCss.control || classes.control;
    }
    props.formik.ezCss = customCss;
    var className = props.className ? classes.form + " " + props.className : classes.form;
    return React.createElement(formik_1.Form, __assign({}, props, { className: className }));
};
exports["default"] = formik_1.connect(EzForm);
