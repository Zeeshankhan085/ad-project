import React from 'react';
import { useField, useFormikContext } from 'formik';
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@mui/material';

function CheckBoxWrapper({ name, label, ...otherProps }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    const { checked } = e.target;
    setFieldValue(name, checked);
  };
  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'standard',
    margin: 'dense',
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <FormControl {...configTextField}>
      <FormLabel></FormLabel>
      <FormGroup>
        <FormControlLabel
          checked={field.value}
          label={label}
          control={<Checkbox {...configCheckbox} />}
        ></FormControlLabel>
      </FormGroup>
    </FormControl>
  );
}

export default CheckBoxWrapper;
