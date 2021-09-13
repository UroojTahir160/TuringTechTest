import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import LoadingSpinner from "../shared/LoadingSpinner";
import axios from "axios";
import { AuthContext } from "../shared/context/auth-context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    variant: "h6",
    color: theme.palette.primary.main,
  },
  demo: {
    variant: "h6",
    color: "#fff",
    fontFamily: "Montserrat, sans-serif",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ArchiveCall(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [ApiError, setApiError] = useState(false);
  const auth = useContext(AuthContext);
  const [editCallData, setEditCallData] = useState();
  const [res, setResponse] = useState();

  const [success, setSuccess] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  const clearSuccess = () => {
    setSuccess(false);
    CloseArchiveDialogHandler();
  };

  const clearError = () => {
    setApiError(null);
    CloseArchiveDialogHandler();
  };

  useEffect(() => {
    setSuccess(responseStatus === 200);
  }, [responseStatus]);

  const CloseArchiveDialogHandler = () => {
    props.setOpenArchiveDialog(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://frontend-test-api.aircall.io/calls/${props.callId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((response) => {
        setLoading(false);
        setEditCallData(response.data);
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

  const confirmArchiveHandler = () => {
    const archiveCall = () => {
      setLoading(true);
      var body = {
        direction: editCallData.direction,
        from: editCallData.from,
        to: editCallData.to,
        duration: editCallData.duration,
        is_archived: !editCallData.is_archived,
        call_type: editCallData.call_type,
        via: editCallData.via,
        created_at: editCallData.created_at,
      };
      axios
        .put(
          `https://frontend-test-api.aircall.io/calls/${props.callId}/archive`,
          body,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        )
        .then((response) => {
          setLoading(false);
          setResponse(response.data);
          setResponseStatus(response.status);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401) {
            setApiError(error.response.data.message);
          } else {
            setApiError("Something went wrong!Please try again later.");
          }
        });
    };
    if (editCallData) archiveCall();
  };

  // re-checking updates
  res && console.log(res);
  return (
    <>
      <LoadingSpinner open={loading} />
      <Snackbar
        open={success || !!ApiError}
        autoHideDuration={3000}
        onClose={responseStatus === 200 ? clearSuccess : clearError}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={responseStatus === 200 ? "success" : "error"}
          onClose={responseStatus === 200 ? clearSuccess : clearError}
        >
          {responseStatus === 200
            ? editCallData.is_archived
              ? "Call UnArchived successfully!"
              : "Call Archived successfully!"
            : ApiError}
        </MuiAlert>
      </Snackbar>
      <Dialog
        onClose={CloseArchiveDialogHandler || responseStatus === 200}
        open={props.OpenArchiveDialog}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
      >
        <DialogTitle
          onClose={CloseArchiveDialogHandler || responseStatus == 200}
          className={classes.dialogTitle}
          style={{ backgroundColor: "#2E1B4B" }}
        >
          {editCallData && editCallData.is_archived
            ? "Unarchive Call Confirmation"
            : "Archive Call Confirmation"}
        </DialogTitle>
        <Divider light variant="middle" />
        <DialogContent dividers style={{ backgroundColor: "#2E1B4B" }}>
          <div className={classes.demo}>
            {editCallData && editCallData.is_archived
              ? "Are you sure you want to Unarchive this call?"
              : "Are you sure you want to archive this call?"}
          </div>
        </DialogContent>

        <DialogActions style={{ backgroundColor: "#2E1B4B" }}>
          <Button
            onClick={confirmArchiveHandler}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>
          <Button
            onClick={CloseArchiveDialogHandler}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
