const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, sender } = req.body;

    // find a conversation to get conversationId and also make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId
      });
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects {user id} of other user in conversation in request body
// returns array of message ids of messages which updated read state to true
router.post("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { otherUserId } = req.body;

    let conversation = await Conversation.findConversation(
      senderId,
      otherUserId
    );

    if (!conversation) {
      return res.sendStatus(404);
    }

    let updatedMessages = await Message.update(
      { isRead: true },
      {
        where: {
          senderId: otherUserId,
          conversationId: conversation.id,
          isRead: false
        },
        returning: true
      }
    );
    if (updatedMessages[0]) {
      let ids = updatedMessages[1].map((msg) => msg.id);
      res.json({ updatedMessages: ids });
    } else {
      res.json({ updatedMessages: [] });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
