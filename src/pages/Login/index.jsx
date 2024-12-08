import React, { useState, useContext } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./Login";
import LabeledTextField from "../../components/LabeledTextField";
import Fuji from "../../Fuji.png";

import { UserContext } from "../../components/UserContext";

const LoginForm = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = (values) => {
    navigate("/dashboard");
  };

  const { itemNames } = useContext(UserContext);

  console.log("itemNames", itemNames);

  const checkValidation = () => {
    if (userName === "admin" && password === "admin") {
      return true;
    }
  };

  return (
    <Grid className={classes.body}>
      <Grid item container className={classes.container} rowGap={4}>
        <Grid xs={12}>
          <img src={Fuji} alt="react logo" className={classes.image} />
        </Grid>
        <Grid xs={12}>
          <LabeledTextField
            id="userName"
            name="userName"
            label="User Name"
            placeholder="User Name"
            onChange={(value) => setUserName(value)}
            value={userName}
          />
        </Grid>
        <Grid xs={12}>
          <LabeledTextField
            id="password"
            name="password"
            label="Password"
            placeholder="Password"
            onChange={(value) => setPassword(value)}
            value={password}
          />
        </Grid>
        <Grid xs={12}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            fullWidth
            disabled={!checkValidation()}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
