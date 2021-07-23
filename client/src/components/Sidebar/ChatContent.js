import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17
  },
  unreadMessage: {
    fontWeight: "bold"
  }
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            (classes.previewText,
            conversation.unreadCount && conversation.otherUser.id === userId
              ? classes.unreadMessage
              : null)
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Badge
        color='primary'
        badgeContent={conversation.unreadCount}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default ChatContent;
