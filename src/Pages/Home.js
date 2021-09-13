import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../shared/LoadingSpinner";
import { AuthContext } from "../shared/context/auth-context";
import CallList from "../Components/CallList";

import CallPagination from "../Components/CallPagination";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#d3d3d3",
  },
  paper: {
    padding: "20px 20px",
    backgroundColor: "#2E1B4B",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(9, 1),

      width: "auto",
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(15, 10),
      width: "auto",
    },
  },
  button: {
    float: "right",
    marginBottom: 15,
  },
  collapse: {
    width: "100%",
  },
}));

function Home() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const callsPerPage = 10;
  const [ApiError, setApiError] = useState(null);

  const auth = useContext(AuthContext);

  const classes = useStyles();

  const refreshToken = () => {
    setApiError(null);
    console.log("refresh");
    alert("refresh");
    // setLoading(true);

    axios
      .post("https://frontend-test-api.aircall.io/auth/refresh-token", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((response) => {
        setLoading(false);
        auth.login(response.data.user.id, response.data.access_token);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Something went wrong!Please try again later.");
        }
      });
  };

  const storedData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      console.log("Home expiry stored:" + new Date(storedData.expiration));
      console.log("current time: " + new Date());

      const remainingTime =new Date(storedData.expiration) - new Date().getTime();
      setTimeout(refreshToken, remainingTime);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchCalls = () => {
      axios
        .get(
          `https://frontend-test-api.aircall.io/calls?offset=0&limit=${callsPerPage}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        )
        .then((response) => {
          setLoading(false);
          setCalls(response.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 404) {
            setApiError(error.response.data.message);
          } else {
            setApiError("Something went wrong!Please try again later.");
          }
        });
    };

    fetchCalls();
  }, []);

  const handlePageClick = (event, value) => {
    var index = (value - 1) * callsPerPage;
    const fetchNextCalls = () => {
      axios
        .get(
          `https://frontend-test-api.aircall.io/calls?offset=${index}&limit=${callsPerPage}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        )
        .then((response) => {
          setLoading(false);
          setCalls(response.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 404) {
            setApiError(error.response.data.message);
          } else {
            setApiError("Something went wrong!Please try again later.");
          }
        });
    };

    fetchNextCalls();
  };

  return (
    <>
      <div className={classes.root}>
        <LoadingSpinner open={loading} />
        <Container maxWidth="lg" component="main">
          <Paper elevation={5} className={classes.paper}>
            {calls.nodes && <CallList items={calls} />}
            {calls && <CallPagination handlePageClick={handlePageClick} />}
          </Paper>
        </Container>
      </div>
    </>
  );
}
export default Home;
