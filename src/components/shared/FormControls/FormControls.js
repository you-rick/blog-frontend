import React from 'react';
import "./FormControls.scss";
import {
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    FormHelperText,
    InputLabel,
    Select,
    Radio
} from "@material-ui/core";


export const renderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);


export const renderCheckbox = ({input, label}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox checked={!!input.value} onChange={input.onChange}/>
            }
            label={label}
        />
    </div>
);


export const checkboxGroup = ({label, required, options, input, meta: {touched, invalid, error}}) => {
    return (
        <div className="chipCheckboxContainer">
            {options.map((option, index) => {
                return (
                    <div className="chipCheckbox" key={index}>
                        <input type="checkbox"
                               id={`${input.name}_${index}`}
                               name={`${input.name}[${index}]`}
                               value={option.id}
                               checked={input.value.indexOf(option.id) !== -1}
                               onChange={(event) => {
                                   const newValue = [...input.value];
                                   if (event.target.checked) {
                                       newValue.push(option.id);
                                   } else {
                                       newValue.splice(newValue.indexOf(option.id), 1);
                                   }

                                   return input.onChange(newValue);
                               }}/>
                        <label htmlFor={`${input.name}_${index}`}>
                            {option.name}
                        </label>
                    </div>)
            })
            }
            <div className="chipCheckboxError">{touched && error && <span>{error}</span>}</div>
        </div>
    );
};


export const renderFromHelper = ({touched, error}) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
};


export const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'age',
                id: 'age-native-simple'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({touched, error})}
    </FormControl>
);