import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { BadgeAvatar } from "./index";

import UserMenu from "./UserMenu";

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center"
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17
  }
}));

const CurrentUser = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user || {});

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <UserMenu />
      </Box>
    </Box>
  );
};

export default CurrentUser;
