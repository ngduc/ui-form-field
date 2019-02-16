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
var pick_react_known_prop_1 = require("pick-react-known-prop");
var getClasses = function (use) {
    var defaults = {
        button: 'ez-btn ez-btn--filled',
        primary: 'ez-btn ez-btn--filled ez-btn--primary ez-submit',
        secondary: 'ez-btn ez-btn--filled'
    };
    if (use === 'bootstrap3' || use === 'bootstrap4') {
        defaults.button = 'btn';
        defaults.primary = 'btn btn-primary';
        defaults.secondary = 'btn btn-secondary';
    }
    if (use === 'spectre') {
        defaults.button = 'btn';
        defaults.primary = 'btn btn-primary';
        defaults.secondary = 'btn btn-secondary';
    }
    if (use === 'semanticui2') {
        defaults.button = 'ui button';
        defaults.primary = 'ui primary button';
        defaults.secondary = 'ui secondary button';
    }
    return defaults;
};
var EzButton = function (props) {
    var classes = getClasses(props.formik.ezUse);
    var isSubmit = props.submit || props.type === 'submit';
    var type = isSubmit ? 'submit' : 'button';
    var text = props.children ? props.children : isSubmit ? 'Submit' : 'Button';
    var style = {};
    if (props.gap) {
        style.marginLeft = props.gap;
        style.marginRight = props.gap;
    }
    if (props.leftGap) {
        style.marginLeft = props.leftGap;
    }
    if (props.rightGap) {
        style.marginRight = props.rightGap;
    }
    var htmlProps = pick_react_known_prop_1.pickHTMLProps(props);
    var className = classes.button;
    if (isSubmit || props.primary) {
        className = classes.primary;
    }
    if (props.secondary) {
        className = classes.secondary;
    }
    return (React.createElement("button", __assign({ type: type, className: className + " " + props.className, style: style }, htmlProps), text));
};
exports["default"] = formik_1.connect(EzButton);
