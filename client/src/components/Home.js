import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchConversations } from "../store/utils/thunkCreators";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh"
  }
}));

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // component mount hook
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // component update hook
  useEffect(() => {
    setIsLoggedIn(true);
  }, [user]);

  return !user.id ? (
    // If we were previously logged in, redirect to login instead of register
    isLoggedIn ? (
      <Redirect to='/login' />
    ) : (
      <Redirect to='/register' />
    )
  ) : (
    <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

export default Home;
