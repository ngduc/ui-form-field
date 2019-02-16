import * as React from 'react';
import * as Yup from 'yup';
import { animals, genders, roles, DisplayFormState } from '../Utils'

import FormContainer from '../EzFormContainer'
import Form from '../EzForm';
import Field from '../EzField';
import Button from '../EzButton';

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required!').email('Invalid Email!'),
  birthday: Yup.date().required('Birthday is required!'),
  roles: Yup.array().required('Role is required!')
});

export default class extends React.Component {
  state: any = {};

  onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 800);
    setSubmitting(true);
  }

  renderForm = (props: any) => (
    <Form use="bootstrap4">
      <Field name="email" />
      <Field placeholder="Date of birth (mm/dd/yyyy)" name="birthday" />
      <Field radios options={genders} name="gender" />
      <Field select options={animals} name="animal" />
      <Field checkboxes options={roles} name="roles" />

      <Button type="submit" disabled={props.isSubmitting} />
      <Button gap={10} disabled>Cancel</Button>

      <DisplayFormState {...props} />
    </Form>
  )

  renderHorizontalForm = (props: any) => {
    const css = {
      error: 'left25pct'
    }
    return (
      <Form use="bootstrap4" horizontal css={css}>
        <Field name="email" />
        <Field placeholder="Date of birth (mm/dd/yyyy)" name="birthday" />

        <Button leftGap={'25%'} type="submit" disabled={props.isSubmitting} />
        <Button gap={10} disabled>Cancel</Button>

        <DisplayFormState {...props} />
      </Form>
    )
  }

  render() {
    return (
      <div>
        <FormContainer
          initialValues={{ email: 'example@email.com', roles: [], gender: '' }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />

        <hr />
        <h3>Horizontal Form</h3>
        <FormContainer
          initialValues={{}}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderHorizontalForm}
        />
      </div>
    );
  }
}
