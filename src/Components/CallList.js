import { Typography } from "@material-ui/core";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CallListItems from "./CallListItems";

const CallList = (props) => {
  const heading = {
    padding: "13px",
    fontSize: "1.2rem",
  };
  if (props.items.nodes.length === 0) {
    return (
      <>
        <AppBar position="static" style={{ backgroundColor: "#ec407a" }}>
          <Typography style={heading}>CALLS</Typography>
        </AppBar>
        <Container maxWidth="md" component="main">
          <Typography
            variant="h4"
            color="primary"
            align="center"
            style={{ padding: "20px 0px" }}
          >
            {"No Calls are Found!"}
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ec407a" }}>
        <Typography style={heading} variant="h6">
          CALL LOGS
        </Typography>
      </AppBar>
      {props.items.nodes.map((call) => (
        <CallListItems
          key={call.id}
          id={call.id}
          duration={call.duration}
          is_archived={call.is_archived}
          from={call.from}
          to={call.to}
          direction={call.direction}
          call_type={call.call_type}
          via={call.via}
          created_at={call.created_at}
        />
      ))}
    </>
  );
};
export default CallList;
