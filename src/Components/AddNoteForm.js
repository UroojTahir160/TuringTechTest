import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/LoadingSpinner";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formControl: {
    minWidth: 260,
  },
  Typography: {
    fontFamily: theme.typography.fontFamily,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  GridStyle: {
    margin: "0px 22px",
  },
  error: {
    color: "red",
  },
}));

const AddNoteForm = (props) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [ApiError, setApiError] = useState(null);
  const [afterNoteCall, setAfterNoteCall] = useState();
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  const clearSuccess = () => {
    setSuccess(false);
    props.handleCloseNoteDialog(false);
  };

  const clearError = () => {
    setApiError(null);
    props.handleCloseNoteDialog(false);
  };

  useEffect(() => {
    setSuccess(responseStatus === 201);
  }, [responseStatus]);

  const validationSchema = yup.object().shape({
    content: yup.string().required("This field is required"),
  });
  const onSubmitHandler = (values) => {
    setApiError(null);
    setLoading(true);
    var body = {
      content: values.content,
    };
    axios
      .post(
        `https://frontend-test-api.aircall.io/calls/${props.callId}/note`,
        body,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        setAfterNoteCall(response.data);
        setResponseStatus(response.status);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400 || error.response.status === 404) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Something went wrong!Please try again later.");
        }
      });
  };

  // re-checking updates
  afterNoteCall && console.log(afterNoteCall);

  return (
    <>
      <LoadingSpinner open={loading} />
      <Snackbar
        open={success || !!ApiError}
        autoHideDuration={6000}
        onClose={responseStatus === 201 ? clearSuccess : clearError}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={responseStatus === 201 ? "success" : "error"}
          onClose={responseStatus === 201 ? clearSuccess : clearError}
        >
          {responseStatus === 201 ? "Note Added Successfully!" : ApiError}
        </MuiAlert>
      </Snackbar>
      <Formik
        initialValues={props.initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        {(fProps) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  autoComplete="content"
                  name="content"
                  variant="standard"
                  fullWidth
                  size="small"
                  id="content"
                  label="Content"
                  autoFocus
                  helperText={
                    <ErrorMessage
                      name="content"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={!(fProps.isSubmitting || fProps.isValid)}
              >
                Add Note
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddNoteForm;
