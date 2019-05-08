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
// --- for usage: (in this example)
// import { SingleSelect, MultiSelect, TagSelect } from '../../lib/custom';
// --- for compiling: (will increase bundle size)
// import SingleSelect from '../custom/SingleSelect'; // requires 'react-select' => increase bundle size
// import MultiSelect from '../custom/MultiSelect'; // requires 'react-select' => increase bundle size
// import TagSelect from '../custom/TagSelect'; // requires 'react-tag-autocomplete' => increase bundle size
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
            return (React.createElement(UIForm_1["default"], { use: "bootstrap4" },
                React.createElement(UIField_1["default"], { label: "Text", name: "text", help: "This is a help text." }),
                React.createElement(UIField_1["default"], { password: true, name: "password" }),
                React.createElement(UIField_1["default"], { textarea: true, name: "textarea" }),
                React.createElement(UIField_1["default"], { select: true, options: Utils_2.animals, name: "select" }),
                React.createElement(UIField_1["default"], { radios: true, options: Utils_2.genders, name: "radio" }),
                React.createElement(UIField_1["default"], { checkboxes: true, options: Utils_2.roles, name: "checkboxes" }),
                React.createElement(UIField_1["default"], { checkbox: true, name: "singleCheckbox" }),
                React.createElement(UIField_1["default"], { number: true, name: "number" }),
                React.createElement(UIField_1["default"], { date: true, name: "date" }),
                React.createElement(UIField_1["default"], { time: true, name: "time" }),
                React.createElement(UIField_1["default"], { toggle: true, inline: true, name: "toggle" }),
                React.createElement(UIField_1["default"], { file: true, label: "File Upload", name: "file1" }),
                React.createElement(UIField_1["default"], { file: true, withPreview: true, label: "File Upload (with Preview)", name: "file2" }),
                React.createElement(UIField_1["default"], { range: true, name: "range" }),
                React.createElement(UIButton_1["default"], { type: "submit" }),
                React.createElement(UIButton_1["default"], { gap: 10 }, "Button"),
                React.createElement(Utils_1.DisplayFormState, __assign({}, props))));
        };
        return _this;
    }
    default_1.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("strong", null, "Examples: All Field Types"),
            React.createElement(UIFormContainer_1["default"], { initialValues: { password: 'password', number: 3.14, toggle: true }, validationSchema: schema, onSubmit: this.onSubmit, render: this.renderForm })));
    };
    return default_1;
}(React.Component));
exports["default"] = default_1;
