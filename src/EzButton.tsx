import * as React from 'react';
import { connect } from 'formik';
import { pickHTMLProps } from 'pick-react-known-prop';

const getClasses = (use: string) => {
  const defaults = {
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

interface IEzButtonProps {
  type?: string,
  primary?: string|boolean,
  secondary?: string|boolean,
  submit?: any,
  // --- styles
  className?: string,
  gap?: string|number,
  leftGap?: string|number,
  rightGap?: string|number,
  disabled?: string|boolean,
  children?: any,
  formik?: any; // FormikContext<{}>
}

const EzButton = (props: IEzButtonProps) => {
  const classes = getClasses(props.formik.ezUse);
  const isSubmit = props.submit || props.type === 'submit';
  const type = isSubmit ? 'submit' : 'button';
  const text = props.children ? props.children : isSubmit ? 'Submit' : 'Button';
  const style: any = {}
  if (props.gap) {
    style.marginLeft = props.gap
    style.marginRight = props.gap
  }
  if (props.leftGap) {
    style.marginLeft = props.leftGap;
  }
  if (props.rightGap) {
    style.marginRight = props.rightGap;
  }
  const htmlProps = pickHTMLProps(props)

  let className = classes.button
  if (isSubmit || props.primary) {
    className = classes.primary
  }
  if (props.secondary) {
    className = classes.secondary
  }
  return (
    <button type={type} className={`${className} ${props.className}`} style={style} {...htmlProps}>
      {text}
    </button>
  );
};

export default connect(EzButton);
