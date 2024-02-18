import React, { useEffect } from "react";
import { useSocketContext } from "../contex/SocketContex";
import useConversation from "../store/useConersation";
import notification from "../assets/sound/notification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      //shake message
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    //important line to listen only once for new message
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
