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
var EzFormContainer_1 = require("../EzFormContainer");
var EzForm_1 = require("../EzForm");
var EzField_1 = require("../EzField");
var EzButton_1 = require("../EzButton");
var schema = Yup.object().shape({
    username: Yup.string().required('Username is required!')
});
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderForm = function (props) {
            return (React.createElement(EzForm_1["default"], { use: "bootstrap4" },
                React.createElement(EzField_1["default"], { row: true },
                    React.createElement(EzField_1["default"], { name: "username" }),
                    React.createElement(EzField_1["default"], { name: "email" })),
                React.createElement(EzField_1["default"], { row: true },
                    React.createElement(EzField_1["default"], { password: true, name: "password" }),
                    React.createElement(EzField_1["default"], { password: true, name: "confirm" })),
                React.createElement(EzButton_1["default"], { type: "submit" }),
                React.createElement(Utils_1.DisplayFormState, __assign({}, props))));
        };
        return _this;
    }
    default_1.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("strong", null, "Form Layouts:"),
            React.createElement(EzFormContainer_1["default"], { initialValues: { email: 'example@email.com', roles: [], gender: '' }, validationSchema: schema, onSubmit: function () { }, render: this.renderForm })));
    };
    return default_1;
}(React.Component));
exports["default"] = default_1;
