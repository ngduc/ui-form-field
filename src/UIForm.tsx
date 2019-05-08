import * as React from 'react';
import { connect, Form } from 'formik';
import { clone } from './Utils';
// const _clone = require('lodash.clone');

const getClasses = (use: string) => {
  const defaults = {
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

interface IUIFormProps {
  use?: '' | 'bootstrap3' | 'bootstrap4' | 'spectre' | 'semanticui2';
  horizontal?: string | boolean;
  css?: any; // TODO: define interface for "css"
  className?: string;
  disabled?: string | boolean;
  children?: any;
  formik?: any; // FormikContext<{}>
}

const UIForm = (props: IUIFormProps) => {
  const classes = getClasses(props.use);
  const horizontal = typeof props.horizontal !== 'undefined' ? props.horizontal.toString() : '';

  props.formik.ezUse = props.use; // bootstrap, spectre, etc.
  props.formik.ezHorizontal = horizontal;

  const customCss = clone(props.css);
  if (props.formik.ezHorizontal) {
    customCss.form = customCss.form || classes.form;
    customCss.label = customCss.label || classes.label;
    customCss.control = customCss.control || classes.control;
  }
  props.formik.ezCss = customCss;

  const clonedProps = {
    ...props // clone
  };
  clonedProps.horizontal = horizontal;

  const className = props.className ? `${classes.form} ${props.className}` : classes.form;
  return <Form {...clonedProps} className={className} />;
};
export default connect(UIForm);
