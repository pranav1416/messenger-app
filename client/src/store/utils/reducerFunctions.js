export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message]
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state
    .map((convo) => {
      if (convo.id === message.conversationId) {
        const convoCopy = { ...convo };
        convoCopy.messages.push(message);
        convoCopy.latestMessageText = message.text;

        return convoCopy;
      } else {
        return convo;
      }
    })
    .sort((convo1, convo2) => {
      let convo1Date = new Date(
        convo1.messages[convo1.messages.length - 1].createdAt
      );
      let convo2Date = new Date(
        convo2.messages[convo2.messages.length - 1].createdAt
      );
      if (convo1Date > convo2Date) return -1;
      else return 1;
    });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

<<<<<<< HEAD
// function to add conversations in store
// input args: conversations
// return: coversations sorted in descending order
export const addConversationsToStore = (conversations) => {
  conversations.sort((convo1, convo2) => {
    let convo1Date = new Date(
      convo1.messages[convo1.messages.length - 1].createdAt
    );
    let convo2Date = new Date(
      convo2.messages[convo2.messages.length - 1].createdAt
    );
    if (convo1Date > convo2Date) return -1;
    else return 1;
  });
  return conversations;
};
=======
// function to upadte conversations in state:
// with converasationId update the messages for the user [IDs or complete message obj]
export const updateReadMessagesToStore = (
  state,
  conversationId,
  messageIds
) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const newConvo = { ...convo };
      newConvo.messages.forEach((msg) => {
        if (messageIds.includes(msg.id)) {
          Object.assign(msg, { isRead: true });
        }
      });
      return newConvo;
    } else {
      return convo;
    }
  });
};

// function to add conversations in store
// input args: conversations
// return: coversations sorted in descending order; also add unreadCount for each conversation
export const addConversationsToStore = (conversations) => {
  conversations
    .sort((convo1, convo2) => {
      let convo1Date = new Date(
        convo1.messages[convo1.messages.length - 1].createdAt
      );
      let convo2Date = new Date(
        convo2.messages[convo2.messages.length - 1].createdAt
      );
      if (convo1Date > convo2Date) return -1;
      else return 1;
    })
    .forEach((convo) => {
      let unreadCount = convo.messages.filter(
        (msg) => msg.isRead === false
      ).length;
      Object.assign(convo, { unreadCount: unreadCount });
    });
  return conversations;
};

// function to update conversations present in store
// input args: state
// return: conversations sorted in descending order; update unreadCount for each conversation
export const updateConversationsInStore = (state) => {
  let newState = [...state];
  newState
    .sort((convo1, convo2) => {
      let convo1Date = new Date(
        convo1.messages[convo1.messages.length - 1].createdAt
      );
      let convo2Date = new Date(
        convo2.messages[convo2.messages.length - 1].createdAt
      );
      if (convo1Date > convo2Date) return -1;
      else return 1;
    })
    .forEach((convo) => {
      let unreadCount = convo.messages.filter(
        (msg) => msg.isRead === false
      ).length;
      Object.assign(convo, { unreadCount: unreadCount });
    });
  return newState;
};
>>>>>>> Feature: Unread message counter
