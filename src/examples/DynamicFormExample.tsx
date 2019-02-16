import * as React from 'react';
import * as Yup from 'yup';
import { DisplayFormState, deleteProperties } from '../Utils'

import FormContainer from '../EzFormContainer'
import Form from '../EzForm';
import Field from '../EzField';
import Button from '../EzButton';

export const genders = [
  { value: '', label: 'N/A'},
  { value: 'MALE', label: 'Male', render: () => <Field>Wife Name | wifeName</Field>},
  { value: 'FEMALE', label: 'Female'}
]

const schema = Yup.object().shape({
})

export default class extends React.Component {

  onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 800);
  }

  renderForm = (props: any) => {
    const gender = props.values.gender
    return (
      <Form use="bootstrap4">
        <Field>Email | email</Field>
        <Field radios options={genders} onChange={() => this.onChangeGender(props)}>Gender | gender</Field>

        {gender === 'MALE' && <Field>Wife Name | wifeName</Field>}
        {gender === 'FEMALE' && <Field>Husband Name | husbandName</Field>}
  
        <Button type="submit" />
        <DisplayFormState {...props} />
      </Form>
    )
  }

  onChangeGender = (props: any) => {
    deleteProperties(props.values, ['husbandName', 'wifeName']); // clean up form data
  }

  render() {
    return (
      <div>
        <strong>Select Radio button to render a child form for each option:</strong>
        <FormContainer
          initialValues={{ email: 'example@email.com', roles: [], gender: '' }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}