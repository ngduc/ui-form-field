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
var Yup = require("yup");
var Utils_1 = require("../Utils");
var Utils_2 = require("../Utils");
var UIFormContainer_1 = require("../UIFormContainer");
var UIForm_1 = require("../UIForm");
var UIField_1 = require("../UIField");
var UIButton_1 = require("../UIButton");
exports.genders = [
    { value: '', label: 'N/A' },
    { value: 'MALE', label: 'Male', render: function () { return React.createElement(UIField_1["default"], null, "Wife Name | wifeName"); } },
    { value: 'FEMALE', label: 'Female' }
];
var schema = Yup.object().shape({});
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSubmit = function (values, _a) {
            var setSubmitting = _a.setSubmitting;
            setTimeout(function () {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                Utils_2.log('onSubmit')(values);
            }, 800);
            setSubmitting(true);
        };
        _this.renderForm = function (props) {
            var gender = props.values.gender;
            return (React.createElement(UIForm_1["default"], { use: "bootstrap4" },
                React.createElement(UIField_1["default"], { onChange: Utils_2.log('email - onChange') }, "Email | email"),
                React.createElement(UIField_1["default"], { radios: true, options: exports.genders, onChange: Utils_2.log('radios - onChange') }, "Gender | gender"),
                React.createElement(UIField_1["default"], { checkboxes: true, options: Utils_2.roles, onChange: Utils_2.log('checkboxes - onChange') }, "Role(s) | roles"),
                gender === 'MALE' && React.createElement(UIField_1["default"], null, "Wife Name | wifeName"),
                gender === 'FEMALE' && React.createElement(UIField_1["default"], null, "Husband Name | husbandName"),
                React.createElement(UIButton_1["default"], { type: "submit" }),
                React.createElement(Utils_1.DisplayFormState, __assign({}, props))));
        };
        _this.onGenderChange = function (props) {
            delete props.values.husbandName;
            delete props.values.wifeName;
        };
        return _this;
    }
    default_1.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("strong", null, "Console log for: onChange, onSubmit:"),
            React.createElement(UIFormContainer_1["default"], { initialValues: { email: 'example@email.com', roles: [], gender: '' }, validationSchema: schema, onSubmit: this.onSubmit, render: this.renderForm })));
    };
    return default_1;
}(React.Component));
exports["default"] = default_1;
