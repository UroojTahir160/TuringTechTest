import React , {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AuthForm from "../Components/AuthForm";
import LoadingSpinner from "../shared/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#d3d3d3",
    paddingLeft: 60,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  input: {
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Typography: {
    fontFamily: theme.typography.fontFamily,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
 
  },
  submit: {
    margin: "10px 0px",
  },
  mainHeadTypo: {
    fontWeight: "bold",
    color: "#B8A4C7",
  },
  signIn: {
    color: theme.palette.primary.main,
    marginBottom: "5px",
    marginTop:"5px"
  },
}));

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  const classes = useStyles();
  const paperStyle = {
    width: "80%",
    padding: 20,
    margin: "120px auto",
    backgroundColor: "#2E1B4B",
    
  };

  return (
    <div className={classes.root}>
      <LoadingSpinner open={isLoading} />
      <Container component="main" maxWidth="sm" style={{ padding: "0px" }}>
        <Paper elevation={10} style={paperStyle}>
          <Typography
            align="center"
            variant="h4"
            className={classes.mainHeadTypo}
          >
            Turing Tech
          </Typography>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6" className={classes.signIn}>
              Sign in
            </Typography>
            <AuthForm          //API call in AuthForm
             initialValues={initialValues}
             setIsLoading={setIsLoading}
            />
          </div>
          <Box mt={3}></Box>
        </Paper>
      </Container>
    </div>
  );
}
