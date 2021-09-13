import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CallDetails from "./CallDetails";
import axios from "axios";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  GridStyle: {
    margin: " 0px 45px 0px 23px",
  },
  root: {
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#d3d3d3",
  },
  paperStyle: {
    width: "100%",
    padding: 20,
    backgroundColor: "#2E1B4B",
    margin: "80px auto",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "50px",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  InterviewFields: {
    marginTop: 7,
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    textAlign: "center",
    backgroundColor: "#2E1B4B",
    marginTop: 10,
  },
  mainHeadTypo: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

function ViewCallLog(props) {
  const [loading, setLoading] = useState(false);
  const [ApiError, setApiError] = useState(null);
  const [callDetails, setCallDetails] = useState();

  const auth = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://frontend-test-api.aircall.io/calls/${props.callId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((response) => {
        setLoading(false);
        setCallDetails(response.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 404) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Something went wrong!Please try again later.");
        }
      });
  }, [props.callId]);

  const classes = useStyles();

  return (
    <>
      {loading && !callDetails ? (
        <LoadingSpinner open={loading} />
      ) : (
        <Dialog open={props.open} fullWidth maxWidth="sm">
          <DialogTitle disableTypography style={{ backgroundColor: "#2E1B4B" }}>
            <Typography
              variant="h4"
              align="center"
              className={classes.mainHeadTypo}
            >
              Call Details
            </Typography>

            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <ListAltIcon />
              </Avatar>
            </div>
          </DialogTitle>
          <DialogContent dividers style={{ backgroundColor: "#2E1B4B" }}>
            <div className={classes.demo}>
              {callDetails && (
                <CallDetails callId={props.callId} callDetails={callDetails} />
              )}
            </div>
          </DialogContent>

          <DialogActions style={{ backgroundColor: "#2E1B4B" }}>
            <Button autoFocus onClick={props.handleCloseDialog} color="primary">
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ViewCallLog;
