import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    // console.log("user ", req.user);
    const { id: recieverId } = req.params;
    const senderId = req.user._id; //from protect routes

    //find conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    //create conversation if not
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    //optimised code

    //this will run parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //get recievrs socket id

    //SOCKET.IO Functionality
    const recieverSocketId = getRecieverSocketId(recieverId);

    if (recieverSocketId) {
      //io.to(<socket_id>).emit() used to send events to specific client
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     //object of messages
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] }, //query criteria. It's specifying that the document being searched for should have an array field named participants where both senderId and userToChatId are present.
//     }).populate("messages"); //populate messages from conersation

//     //no conversation send 404
//     if (!conversation) {
//       res.status(404).json({ message: "Conversation not found" });
//     }
//     return res.status(200).json(conversation.messages || []);
//   } catch (error) {
//     console.log("error in getMessages controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
