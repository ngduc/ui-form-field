import * as React from 'react';
import * as Yup from 'yup';
import { DisplayFormState } from '../Utils'

import FormContainer from '../EzFormContainer'
import Form from '../EzForm';
import Field from '../EzField';
import Button from '../EzButton';

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
});

export default class extends React.Component {

  renderForm = (props: any) => {
    return (
      <Form use="bootstrap4">
        <Field row>
          <Field name="username" />
          <Field name="email" />
        </Field>
        <Field row>
          <Field password name="password" />
          <Field password name="confirm" />
        </Field>
  
        <Button type="submit" />
        <DisplayFormState {...props} />
      </Form>
    )
  }

  render() {
    return (
      <div>
        <strong>Form Layouts:</strong>
        <FormContainer
          initialValues={{ email: 'example@email.com', roles: [], gender: '' }}
          validationSchema={schema}
          onSubmit={() => {}}
          render={this.renderForm}
        />
      </div>
    );
  }
}