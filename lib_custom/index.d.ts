interface IUIFormProps {
  use?: '' | 'bootstrap3' | 'bootstrap4' | 'spectre' | 'semanticui2';
  horizontal?: string | boolean;
  css?: any;
  className?: string;
  disabled?: string | boolean;
  children?: any;
  formik?: any;
}

interface UIFieldProps {
  className?: string;
  controlCss?: string;
  labelCss?: string;
  toggleCss?: string;
  fileCss?: string;
  rowCss?: string;
  errorCss?: string;
  helpCss?: string;
  label?: string | any;
  placeholder?: string;
  name?: string;
  help?: string | any;
  row?: string | boolean;
  password?: string | boolean;
  number?: string | boolean;
  date?: string | boolean;
  time?: string | boolean;
  range?: string | boolean;
  radio?: string | boolean;
  radios?: string | boolean;
  checkbox?: string | boolean;
  checkboxes?: string | boolean;
  select?: string | boolean;
  tagSelect?: string | boolean;
  singleSelect?: string | boolean;
  multiSelect?: string | boolean;
  custom?: any;
  options?: any[];
  toggle?: string | boolean;
  inline?: string | boolean;
  textarea?: string | boolean;
  file?: string | boolean;
  withPreview?: string | boolean;
  renderField?: (props?: any) => void;
  value?: any;
  onChange?: (val: any) => void;
  disabled?: boolean;
  validate?: any;
  children?: any;
  formik?: any;
}

interface IUIButtonProps {
  type?: string;
  primary?: string | boolean;
  secondary?: string | boolean;
  submit?: any;
  className?: string;
  gap?: string | number;
  leftGap?: string | number;
  rightGap?: string | number;
  disabled?: string | boolean;
  children?: any;
  formik?: any;
}

declare module 'ui-form-field' {
  export function FormContainer(props: any): any;
  export function Form(props: IUIFormProps): any;
  export function Field(props: UIFieldProps): any;
  export function Button(props: IUIButtonProps): any;

  export function UIFormContainer(props: any): any;
  export function UIForm(props: IUIFormProps): any;
  export function UIField(props: UIFieldProps): any;
  export function UIButton(props: IUIButtonProps): any;
}
