import React  from "react";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  GridStyle: {
    margin: " 0px 45px 0px 23px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  submit: {
    textAlign: "center",

    marginTop: 10,
  },
}));

const validationSchema = yup.object().shape({
  direction: yup
    .string()
    .required("This field is required"),

  from: yup
    .string()
    .required("This field is required"),
  
  to: yup
    .string()
    .required("This field is required"),

  duration: yup
    .string()
    .required("This field is required"),
   
  is_archived: yup
    .boolean()
    .required("This field is required"),

  call_type: yup.string().required("This field is required"),

  via: yup.string().required("This field is required"),

  created_at: yup.string().required("This field is required")
});

const CallDetails = (props) => {
  const callId = props.callId;
  const classes = useStyles();

  const initialValues = {
    direction: props.callDetails.direction,
    from: props.callDetails.from,
    to: props.callDetails.to,
    duration: props.callDetails.duration,
    is_archived: props.callDetails.is_archived,
    call_type: props.callDetails.call_type,
    via:props.callDetails.via,
    created_at: props.callDetails.created_at
    };
 


  const onSubmitHandler = (values) => {
   
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(fProps) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="from"
                  label="Caller"
                  name="from"
                  helperText={
                    <ErrorMessage
                      name="from"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  id="to"
                  multiline
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="to"
                  label="Callee"
                  helperText={
                    <ErrorMessage
                      name="to"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="duration"
                  label="Duration"
                  name="duration"
                  helperText={
                    <ErrorMessage
                      name="duration"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  id="direction"
                  multiline
                  variant="standard"
                  margin="normal"

                  fullWidth
                  name="direction"
                  label="Direction"
                  helperText={
                    <ErrorMessage
                      name="direction"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="created_at"
                  label="Call Time"
                  name="created_at"
                  inputProps={{ readOnly: true }}
                  helperText={
                    <ErrorMessage
                      name="created_at"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  id="is_archived"
                  multiline
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="is_archived"
                  inputProps={{ readOnly: true }}
                  label="Call Archived"
                  helperText={
                    <ErrorMessage
                      name="is_archived"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="call_type"
                  label="Call Type"
                  name="call_type"
                  helperText={
                    <ErrorMessage
                      name="call_type"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  id="via"
                  multiline
                  variant="standard"
                  margin="normal"

                  fullWidth
                  name="via"
                  label="Aircall Via"
                  helperText={
                    <ErrorMessage
                      name="via"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
            </Grid>

            {/* <Grid className={classes.submit}>
              {!props.disableField && (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="medium"
                  disabled={!(fProps.isValid || fProps.isSubmitting)}
                  startIcon={<BiSave style={{ marginLeft: 6 }} />}
                >
                  Save Changes
                </Button>
              )}
            </Grid> */}
          </Form>
        )}
      </Formik>
    </>
  );
};
export default CallDetails;
