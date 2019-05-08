import * as React from 'react';
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
declare const _default: React.ComponentType<IUIButtonProps>;
export default _default;
