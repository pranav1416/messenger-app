import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { fetchConversations } from "../store/utils/thunkCreators";

const styles = {
  root: {
    height: "97vh"
  }
};

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { classes } = props;

  // component mount hook
  useEffect(() => {
    props.fetchConversations();
  }, []);

  // component update hook
  useEffect(() => {
    setIsLoggedIn(true);
  }, [props.user.id]);

  return !props.user.id ? (
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
