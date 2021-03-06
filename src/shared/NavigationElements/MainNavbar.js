import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: theme.palette.secondary.main,
  },
  MainLogo: {
    flexGrow: 1,
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
  },
  button: {
    margin: "auto 6px",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
  },
}));
export default function MainNavbar() {
    const classes = useStyles();
    const history = useHistory();
    const auth = useContext(AuthContext)
    const logout = () => {
       auth.logout();
      };
  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h4" className={classes.MainLogo}>
         TuringTech 
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
          color="primary"
          className={classes.button}
          onClick={logout}
          size="large"
        >
          LogOut
        </Button>
      </Toolbar>
    </AppBar>
  );
}
