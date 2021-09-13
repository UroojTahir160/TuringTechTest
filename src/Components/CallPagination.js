import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      color: "white",
      justifyContent: "center",
    },
  },
}));

const CallPagination = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={10}
        color="secondary"
        onChange={props.handlePageClick}
        shape="rounded"
      />
    </div>
  );
};
export default CallPagination;
