import React from "react";
import { makeStyles } from "@mui/styles";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  label: theme.appDirector.label,
  required: {
    color: "red",
  },
  invalid: {
    color: "red",
    fontSize: "12px",
  },
  errorTextField: {
    borderColor: "red !important",
  },
}));

const LabeledTextField = ({
  label,
  required,
  errors,
  name,
  onChange,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <>
      <span className={classes.label}>
        {label}
        {required ? <span className={classes.required}> *</span> : ""}
      </span>
      <FormControl size="small" fullWidth className={classes.textBox}>
        <TextField
          variant="outlined"
          size="small"
          inputProps={
            errors &&
            errors[name] && {
              classes: {
                notchedOutline: classes.errorTextField,
              },
            }
          }
          name={name}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...rest}
        />
        {errors && errors[name] && (
          <p className={classes.invalid}>{errors[name]}</p>
        )}
      </FormControl>
    </>
  );
};

export default LabeledTextField;
