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
    color: "#9CADC8",
    fontSize: 14,
    letterSpacing: -0.17
  },
  unreadMessage: {
    fontWeight: "bold"
  },
  typingText: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#9CADC8"
  },
  typingUnreadText: {
    fontStyle: "italic",
    fontSize: 14,
    fontWeight: "bold",
    color: "#9CADC8"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation, userId, typing } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            conversation.unreadCount &&
            conversation.messages &&
            conversation.messages.length &&
            conversation.messages[conversation.messages.length - 1].senderId !==
              userId
              ? typing
                ? classes.typingUnreadText
                : classes.unreadMessage
              : typing
              ? classes.typingText
              : classes.previewText
          }
        >
          {typing
            ? "Typing..."
            : latestMessageText && latestMessageText.length > 15
            ? String(latestMessageText).substring(0, 12) + "..."
            : latestMessageText}
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
