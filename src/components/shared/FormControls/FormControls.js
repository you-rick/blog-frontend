import React from 'react';
import './FormControls.scss';
import { TextField, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';

export const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox checked={!!input.value} onChange={input.onChange} />
      }
      label={label}
    />
  </div>
);

// eslint-disable-next-line no-unused-vars
export const checkboxGroup = ({ label, required, options, input, meta: { touched, invalid, error } }) => (
  <div className="chipCheckboxContainer">
    {options.map((option, index) => (
      <div className="chipCheckbox">
        <input
          type="checkbox"
          id={`${input.name}_${index}`}
          name={`${input.name}[${index}]`}
          value={option.id}
          checked={input.value.indexOf(option._id) !== -1}
          onChange={(event) => {
            const newValue = [...input.value];
            if (event.target.checked) {
              newValue.push(option._id);
            } else {
              newValue.splice(newValue.indexOf(option._id), 1);
            }

            return input.onChange(newValue);
          }}
        />
        <label htmlFor={`${input.name}_${index}`}>
          {option.name || option.title}
        </label>
      </div>
    ))}
    <div className="chipCheckboxError">{touched && error && <span>{error}</span>}</div>
  </div>
);

export const renderFromHelper = ({ touched, error }) => {
  if (touched && error) {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
  return false;
};

export const renderSelectField = ({ input, label, meta: { touched, error, invalid }, children, ...custom }) => (
  <TextField
    select
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}

  >
    {children}
  </TextField>
);
