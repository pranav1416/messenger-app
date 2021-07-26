import React, { Component } from "react";
import { FormControl, FilledInput, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  postMessage,
  updateMessageStatus,
  updateTypingStatus
} from "../../store/utils/thunkCreators";

const styles = {
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
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      typing: false,
      timeout: undefined
    };
  }

  handleClick = () => {
    let conversation = this.props.conversations.find(
      (conv) => conv.id === this.props.conversationId
    );
    this.props.updateMessageStatus(conversation);
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.text) {
      // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
      const reqBody = {
        text: event.target.text.value,
        recipientId: this.props.otherUser.id,
        conversationId: this.props.conversationId,
        sender: this.props.conversationId ? null : this.props.user
      };
      await this.props.postMessage(reqBody);
      this.setState({
        text: ""
      });
    }
  };

  handleKeyPress = async (event) => {
    const emitData = {
      conversationId: this.props.conversationId,
      otherUserId: this.props.otherUser.id,
      typing: true
    };
    if (event.keyCode === 13) {
      this.setState({ typing: false });
      this.props.updateTypingStatus({
        conversationId: this.props.conversationId,
        otherUserId: this.props.otherUser.id,
        typing: false
      });
    } else {
      if (!this.state.typing) {
        this.setState({ typing: true });
        await this.props.updateTypingStatus(emitData);
        this.setState({
          timeout: setTimeout(this.handleTimeout, 1500)
        });
      } else {
        this.setState({ timeout: clearTimeout(this.state.timeout) });
        this.setState({
          timeout: setTimeout(this.handleTimeout, 1500)
        });
      }
    }
  };

  handleTimeout = () => {
    this.setState({ typing: false });
    this.props.updateTypingStatus({
      conversationId: this.props.conversationId,
      otherUserId: this.props.otherUser.id,
      typing: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Box onClick={() => this.handleClick}>
        <form className={classes.root} onSubmit={this.handleSubmit}>
          <FormControl fullWidth hiddenLabel>
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder='Type something...'
              value={this.state.text}
              name='text'
              onChange={this.handleChange}
              onClick={this.handleClick}
              onKeyDown={this.handleKeyPress}
              autoFocus
            />
          </FormControl>
        </form>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    updateMessageStatus: (conversation) => {
      dispatch(updateMessageStatus(conversation));
    },
    updateTypingStatus: (data) => {
      dispatch(updateTypingStatus(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
