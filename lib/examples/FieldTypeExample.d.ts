import * as React from 'react';
export default class extends React.Component {
    onSubmit: (values: any, { setSubmitting }: any) => void;
    renderForm: (props: any) => JSX.Element;
    render(): JSX.Element;
}
