import React, { useState, useContext } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "white",
  },
  submit: {
    margin: "10px 0px",
  },
  error: {
    color: "red",
  },
}));

export default function AuthForm(props) {
  const classes = useStyles();
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be atleast 6 characters long")
      .required("Password is required"),
  });

  const auth = useContext(AuthContext);

  const [ApiError, setApiError] = useState(null);

  const onSubmitHandler = (values) => {
    setApiError(null);
    props.setIsLoading(true);

    axios
      .post(" https://frontend-test-api.aircall.io/auth/login", {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        props.setIsLoading(false);
        auth.login(response.data.user.id, response.data.access_token);
      })
      .catch((error) => {
        props.setIsLoading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Something went wrong!Please try again later.");
        }
      });
  };

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {(props) => (
        <Form>
          <Field
            as={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            size="medium"
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            helperText={
              <ErrorMessage
                name="username"
                style={{ color: "red", fontWeight: "bold" }}
              />
            }
          />

          <Field
            as={TextField}
            variant="standard"
            margin="normal"
            required
            fullWidth
            size="medium"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={
              <ErrorMessage
                name="password"
                style={{ color: "red", fontWeight: "bold" }}
              />
            }
          />
          {ApiError ? (
            <Typography
              className="MuiFormHelperText-root"
              align="center"
              variant="body2"
              className={classes.error}
            >
              Username or Password is incorrect!
            </Typography>
          ) : (
            " "
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={!(props.isValid || props.isSubmitting)}
            className={classes.submit}
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}
