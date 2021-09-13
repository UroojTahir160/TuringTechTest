import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Card, Divider, Grid } from "@material-ui/core";
import { IoMdEye, IoMdArchive } from "react-icons/io";
import { MdUnarchive, MdEventNote } from "react-icons/md";
import ViewCallLog from "./ViewCallLog";
import ArchiveCall from "../Components/ArchiveCall";
import OutsideClickHandler from "react-outside-click-handler";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Menu, MenuItem } from "@material-ui/core";
import AddNote from "./AddNote";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginTop: "15px",
    padding: "10px 17px",
  },

  ViewButton: {
    height: "35px",
    marginTop: "12px ",
    marginRight: "10px",
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "0px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "10px",
    },
  },

  header: {
    flexGrow: 1,
  },
  MoreIconStyle: {
    marginTop: "5px",
  },
}));
const CallListItems = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [OpenArchiveDialog, setOpenArchiveDialog] = useState(false);
  const [CallMobAnchorEl, setCallMobAnchorEl] = useState(null);
  const isCallMenuOpen = Boolean(CallMobAnchorEl);

  const [addNoteDialog, setAddNoteDialog] = useState(false);

  const openCallMenu = (event) => {
    setCallMobAnchorEl(event.currentTarget);
  };
  const closeCallMenu = () => {
    setCallMobAnchorEl(null);
  };
  const OpenArchiveDialogHandler = () => {
    setOpenArchiveDialog(true);
  };

  const handleOpenNoteDialog = () => {
    setAddNoteDialog(true);
  };
  const handleCloseNoteDialog = () => {
    setAddNoteDialog(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const CallMobileMenu = (
    <Menu
      anchorEl={CallMobAnchorEl}
      id="Int-mob-menu"
      keepMounted
      open={isCallMenuOpen}
      //   anchorOrigin={{
      //     vertical: "bottom",
      //     horizontal: "bottom",
      //   }}
      getContentAnchorEl={null}
    >
      <MenuItem
        style={{ height: 40 }}
        onClick={() => {
          handleOpenNoteDialog();
        }}
      >
        <IconButton color="primary">
          <MdEventNote style={{ color: "#2E1B4B" }} />
        </IconButton>
        <Typography variant="subtitle1">Add Note</Typography>
      </MenuItem>
      {addNoteDialog && (
        <AddNote
          addNoteDialog={addNoteDialog}
          handleCloseNoteDialog={handleCloseNoteDialog}
          callId={props.id}
        />
      )}
      <Divider variant="middle" />
      <MenuItem
        style={{ height: 40 }}
        //   component={Link}
        //   to={`/interviews/view/${props.id}`}
      >
        <IconButton color="primary">
          <IoMdEye style={{ color: "#2E1B4B" }} />
        </IconButton>
        <Typography variant="subtitle1">View Notes</Typography>
      </MenuItem>
    </Menu>
  );
  return (
    <Card className={classes.card}>
      <Grid container spacing={5}>
        <Grid item sm={6} lg={7} style={{ flexGrow: 1 }}>
          <div className={classes.header}>
            <Typography
              variant="h6"
              align="justify"
              style={{ color: "#2E1B4B" }}
            >
              Caller: {props.from + " to Callee: " + props.to}
            </Typography>
            <Typography
              variant="subtitle1"
              align="justify"
              style={{ color: "grey" }}
            >
              Direction: {props.direction}
            </Typography>
            <Typography
              variant="subtitle1"
              align="justify"
              style={{ color: "grey" }}
            >
              Call Type: {props.call_type}
            </Typography>
          </div>
        </Grid>

        <Grid item sm={6} lg={5} style={{ flexGrow: 1 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
            className={classes.ViewButton}
            startIcon={<IoMdEye style={{ marginLeft: 6 }} />}
            onClick={() => {
              handleOpenDialog();
            }}
          >
            View Details
          </Button>
          {open && (
            <ViewCallLog
              open={open}
              handleCloseDialog={handleCloseDialog}
              setOpen={setOpen}
              callId={props.id}
            />
          )}

          <Button
            variant="contained"
            style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
            className={classes.ViewButton}
            startIcon={
              props.is_archived ? (
                <MdUnarchive style={{ marginLeft: 6 }} />
              ) : (
                <IoMdArchive style={{ marginLeft: 6 }} />
              )
            }
            onClick={() => {
              OpenArchiveDialogHandler();
            }}
          >
            {props.is_archived ? "Unarchive Call" : "Archive Call"}
          </Button>
        </Grid>
      </Grid>
      {OpenArchiveDialog && (
        <ArchiveCall
          OpenArchiveDialog={OpenArchiveDialog}
          setOpenArchiveDialog={setOpenArchiveDialog}
          callId={props.id}
        />
      )}

      <OutsideClickHandler onOutsideClick={closeCallMenu}>
        <IconButton onClick={openCallMenu}>
          <MoreVertIcon className={classes.MoreIconStyle} />
        </IconButton>
      </OutsideClickHandler>
      {CallMobileMenu}
    </Card>
  );
};

export default CallListItems;
