import React from "react";

import { useAuthContext } from "../../contex/AuthContext";
import useConversation from "../../store/useConersation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formatedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  console.log("fromMe", fromMe);
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white  ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div
        className={`chat-footer opacity-50 text-xs flex gap-1 items-center `}
      >
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
