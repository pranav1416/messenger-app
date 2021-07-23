import React, { Component } from "react";
import { FormControl, FilledInput, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  postMessage,
  updateMessageStatus
} from "../../store/utils/thunkCreators";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15
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
      text: ""
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
              onClick={() => this.handleClick}
              onFocus={() => this.handleClick}
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
