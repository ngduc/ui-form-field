import * as React from 'react';
import * as Yup from 'yup';
import { DisplayFormState } from '../Utils';
import { log, animals, roles, genders } from '../Utils';

import FormContainer from '../UIFormContainer';
import Form from '../UIForm';
import Field from '../UIField';
import Button from '../UIButton';

// --- for usage: (in this example)
// import { SingleSelect, MultiSelect, TagSelect } from '../../lib/custom';

// --- for compiling: (will increase bundle size)
// import SingleSelect from '../custom/SingleSelect'; // requires 'react-select' => increase bundle size
// import MultiSelect from '../custom/MultiSelect'; // requires 'react-select' => increase bundle size
// import TagSelect from '../custom/TagSelect'; // requires 'react-tag-autocomplete' => increase bundle size

const schema = Yup.object().shape({});

export default class extends React.Component {
  onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      log('onSubmit')(values);
    }, 800);
    setSubmitting(true);
  };

  renderForm = (props: any) => {
    return (
      <Form use="bootstrap4">
        <Field label="Text" name="text" help="This is a help text." />
        <Field password name="password" />
        <Field textarea name="textarea" />
        <Field select options={animals} name="select" />
        <Field radios options={genders} name="radio" />
        <Field checkboxes options={roles} name="checkboxes" />
        <Field checkbox name="singleCheckbox" />
        {/* <Field custom={SingleSelect} options={animals.slice(1)} name="singleSelect" />
        <Field custom={MultiSelect} options={animals.slice(1)} name="multiSelect" />
        <Field custom={TagSelect} options={animals.slice(1)} name="tags" /> */}
        <Field number name="number" />
        <Field date name="date" />
        <Field time name="time" />
        <Field toggle inline name="toggle" />
        <Field file label="File Upload" name="file1" />
        <Field file withPreview label="File Upload (with Preview)" name="file2" />
        <Field range name="range" />

        {/* ---------- example of Custom Field with Formik ---------- */}
        {/* <UIField
          label="Custom Field: (React Multi Select)"
          name="customMultiSelect"
          renderField={() => (
            <Select
              multi
              value={formikProps.values.customMultiSelect}
              placeholder={'Select an item...'}
              options={roles}
              searchable={true}
              onChange={(item: any) => {
                formikProps.setFieldValue('customMultiSelect', item)
              }}
            />
          )}
        /> */}

        <Button type="submit" />
        <Button gap={10}>Button</Button>
        <DisplayFormState {...props} />
      </Form>
    );
  };

  render() {
    return (
      <div>
        <strong>Examples: All Field Types</strong>
        <FormContainer
          initialValues={{ password: 'password', number: 3.14, toggle: true }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}
