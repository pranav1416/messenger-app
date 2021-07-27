import React, { useState, useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import TypingIndicator from "./TypingIndicator";

const useStyles = makeStyles(() => ({
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginRight: 41,
    marginLeft: 41
  },
  messages: {
    flexGrow: 1
  },
  typingStatus: {
    alignSelf: "bottom"
  }
}));

const Messages = (props) => {
  const { messages, otherUser, userId, typing } = props;
  const [lastReadMessageId, setLastReadMessageId] = useState(null);
  const classes = useStyles();

  const getLastReadMessageId = (messages, otherUser) => {
    for (let idx = messages.length - 1; idx >= 0; idx--) {
      if (
        messages[idx].senderId !== otherUser.id &&
        messages[idx].isRead === true
      ) {
        return messages[idx].id;
      }
    }
  };

  const latestPosition = useRef(null);

  const setScrollPosition = () => {
    latestPosition.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setScrollPosition();
  }, [messages, typing]);

  useEffect(() => {
    setLastReadMessageId(getLastReadMessageId(messages, otherUser));
  });
  return (
    <Box className={classes.messagesContainer}>
      <Box className={classes.messages}>
        {messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
              lastMessage={message.id === lastReadMessageId}
            />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        })}
      </Box>
      <Box className={classes.typingStatus}>
        <TypingIndicator otherUser={otherUser} typing={typing} />
      </Box>
      <Box ref={latestPosition} />
    </Box>
  );
};

export default Messages;
