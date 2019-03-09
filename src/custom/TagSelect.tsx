import * as React from 'react';
import * as ReactTags from 'react-tag-autocomplete'; // DON'T add "@types/" => will break yarn build!

function TagSelect(props: any) {
  const { formik, onChange, fieldName, placeholder } = props;

  const clonedProps = { ...props };
  const values = formik.values[fieldName] || [];
  const { options = [] } = clonedProps;
  delete clonedProps.className;

  const tags = values.map((id: string) => {
    const selectedOption = options['find']((option: any) => option.value === id);
    if (selectedOption) {
      return {
        id: selectedOption.value,
        name: selectedOption.label
      };
    } else {
      return {
        id,
        name: id
      };
    }
  });
  const suggestions = options.map((opt: any) => ({ id: opt.value, name: opt.label }));

  return (
    <ReactTags
      addOnBlur={true}
      allowNew={true}
      allowBackspace={true}
      autofocus={false}
      minQueryLength={0}
      tags={tags}
      placeholder={placeholder}
      suggestions={suggestions}
      handleValidate={({ name }: { name: string }) => name.length}
      handleAddition={({ name }: { name: string }) => {
        const foundOpt = options['find']((option: any) => option.label === name);
        const changedValue = foundOpt ? foundOpt.value : name;
        values.push(changedValue);
        formik.setFieldValue(fieldName, values);
        onChange && onChange({ value: changedValue, formik: formik });
      }}
      handleDelete={(index: number) => {
        values.splice(index, 1);
        formik.setFieldValue(fieldName, values);
        onChange && onChange({ formik: formik, index });
      }}
      {...clonedProps}
    />
  );
}

export default TagSelect;
