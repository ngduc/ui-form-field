import * as React from 'react';
export default class extends React.Component {
    state: any;
    onSubmit: (values: any, { setSubmitting }: any) => void;
    renderForm: (props: any) => JSX.Element;
    renderHorizontalForm: (props: any) => JSX.Element;
    render(): JSX.Element;
}
