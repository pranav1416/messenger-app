import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  },
  typingDotsContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: 5
  },

  typingDots: {
    float: "left",
    borderRadius: "50%",
    opacity: 1,
    width: 12,
    height: 12,
    background: "#cacaca",
    margin: "0.5em 0.1em 0.5em",
    transition: theme.transitions.create(["opacity"], {
      duration: theme.transitions.duration.complex
    })
  }
}));

const TypingIndicator = (props) => {
  const { otherUser, typing } = props;
  const classes = useStyles(typing);

  return typing ? (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      ></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username}
        </Typography>
        <Box className={classes.bubble}>
          <Box className={classes.typingDotsContainer}>
            <Fade in={typing}>
              <Box className={classes.typingDots} />
            </Fade>
            <Fade in={typing} {...(typing ? { timeout: 500 } : {})}>
              <Box className={classes.typingDots} />
            </Fade>
            <Fade in={typing} {...(typing ? { timeout: 1000 } : {})}>
              <Box className={classes.typingDots} />
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    ""
  );
};

export default TypingIndicator;
