import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SideImage } from "./common";
import { SnackbarError } from "../components";
import { register } from "../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100vh",
    fontFamily: "OpenSans"
  },
  loginContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2vh 5vw 0 0"
  },
  loginBtn: {
    color: "#3A8DFF"
  },
  createBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  createBtn: {
    color: "white",
    backgroundColor: "#3A8DFF"
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

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    if (username && email && password) {
      await register({ username, email, password });
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
          <Grid item className={classes.loginContainer}>
            <Typography>Already have an account?</Typography>
            <Box component='span' m={1} />
            <Button
              size='large'
              onClick={() => history.push("/login")}
              component={Paper}
              className={classes.loginBtn}
            >
              Login
            </Button>
          </Grid>
          <Box component='span' m={1} />
          <Box className={classes.formContainer}>
            <form onSubmit={handleRegister}>
              <Grid>
                <Grid item>
                  <Typography component='h4' variant='h4'>
                    Create an account.
                  </Typography>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl className={classes.formChildren}>
                    <TextField
                      aria-label='username'
                      label='Username'
                      name='username'
                      type='text'
                      required
                    />
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl className={classes.formChildren}>
                    <TextField
                      label='E-mail address'
                      aria-label='e-mail address'
                      type='email'
                      name='email'
                      required
                    />
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    className={classes.formChildren}
                  >
                    <TextField
                      aria-label='password'
                      label='Password'
                      type='password'
                      inputProps={{ minLength: 6 }}
                      name='password'
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    className={classes.formChildren}
                  >
                    <TextField
                      label='Confirm Password'
                      aria-label='confirm password'
                      type='password'
                      inputProps={{ minLength: 6 }}
                      name='confirmPassword'
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Box component='span' m={1} />
                <Grid item className={classes.createBtnContainer}>
                  <Button
                    type='submit'
                    className={classes.createBtn}
                    variant='contained'
                    size='large'
                  >
                    Create
                  </Button>
                </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
