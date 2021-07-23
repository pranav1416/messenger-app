import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/utils/thunkCreators";
import { SnackbarError } from "../components";
import { SideImage } from "./common";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100vh",
    fontFamily: "OpenSans"
  },
  registerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2vh 5vw 0 0"
  },
  registerBtn: {
    color: "#3A8DFF"
  },
  loginBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  loginBtn: {
    color: "white",
    backgroundColor: "#3A8DFF",
    alignSelf: "center"
  },
  formContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: "25%",
    paddingTop: "15%"
  },
  formChildren: {
    width: "100%"
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handleLogin");
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (username && password) {
      await login({ username, password });
    } else {
      setErrorMessage("Please enter valid username and password");
      setSnackBarOpen(true);
    }
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Grid container className={classes.mainContainer}>
        <SideImage />
        <Grid item xs={12} sm={8} md={7} elevation={6} square>
          <Grid item className={classes.registerContainer}>
            <Typography>Already have an account?</Typography>
            <Box component='span' m={1} />
            <Button
              component={Paper}
              className={classes.registerBtn}
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </Grid>
          <Box component='span' m={1} />
          <Box className={classes.formContainer}>
            <form onSubmit={handleLogin}>
              <Grid>
                <Grid item>
                  <Typography variant='h4'>Welcome Back!</Typography>
                </Grid>
                <Grid item>
                  <FormControl
                    margin='normal'
                    className={classes.formChildren}
                    required
                  >
                    <TextField
                      aria-label='username'
                      label='Username'
                      name='username'
                      type='text'
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    margin='normal'
                    className={classes.formChildren}
                    required
                  >
                    <TextField
                      label='password'
                      aria-label='password'
                      type='password'
                      name='password'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box component='span' m={1} />
              <Grid item className={classes.loginBtnContainer}>
                <Button
                  type='submit'
                  className={classes.loginBtn}
                  variant='contained'
                  size='large'
                >
                  Login
                </Button>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
