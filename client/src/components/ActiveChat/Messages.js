import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [lastReadMessageId, setLastReadMessageId] = useState(null);
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
  useEffect(() => {
    setLastReadMessageId(getLastReadMessageId(messages, otherUser));
  });
  return (
    <Box>
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
  );
};

export default Messages;
