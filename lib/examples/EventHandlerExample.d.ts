import * as React from 'react';
export declare const genders: ({
    value: string;
    label: string;
    render?: undefined;
} | {
    value: string;
    label: string;
    render: () => JSX.Element;
})[];
export default class extends React.Component {
    onSubmit: (values: any, { setSubmitting }: any) => void;
    renderForm: (props: any) => JSX.Element;
    onGenderChange: (props: any) => void;
    render(): JSX.Element;
}
