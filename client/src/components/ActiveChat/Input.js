import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  postMessage,
  updateMessageStatus,
  updateTypingStatus
} from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    marginLeft: 41,
    marginRight: 41
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = ({ otherUser, conversationId }) => {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [timeout, defineTimeout] = useState(undefined);
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const conversation = useSelector((state) =>
    state.conversations.find((conv) => conv.id === this.props.conversationId)
  );
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    dispatch(updateMessageStatus(conversation));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text) {
      // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
      const reqBody = {
        text: text,
        recipientId: otherUser.id,
        conversationId: conversationId,
        sender: conversationId ? null : user
      };
      dispatch(postMessage(reqBody));
      setText("");
    }
  };

  const handleKeyPress = async (event) => {
    const emitData = {
      conversationId: conversationId,
      otherUserId: otherUser.id,
      typing: true
    };
    if (event.keyCode === 13) {
      setTyping(false);
      dispatch(
        updateTypingStatus({
          conversationId: conversationId,
          otherUserId: otherUser.id,
          typing: false
        })
      );
    } else {
      if (!typing) {
        setTyping(true);
        dispatch(updateTypingStatus(emitData));
        defineTimeout(setTimeout(handleTimeout, 1500));
      } else {
        defineTimeout(clearTimeout(timeout));
        defineTimeout(setTimeout(handleTimeout, 1500));
      }
    }
  };

  const handleTimeout = () => {
    setTyping(false);
    dispatch(
      updateTypingStatus({
        conversationId: this.props.conversationId,
        otherUserId: this.props.otherUser.id,
        typing: false
      })
    );
  };

  return (
    <Box onClick={handleClick}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder='Type something...'
            value={text}
            name='text'
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default Input;
