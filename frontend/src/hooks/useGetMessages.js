import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useConversation, { useTokenStore } from "../store/useConersation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = useTokenStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://chat-app-z859.onrender.com/api/messages/${selectedConversation._id}`,
          {
            method: "GET", // Adjust method as needed

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Or appropriate content type
            },
          }
        );

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]); //when selectedConversation._id changes run this

  return { messages, loading };
};

export default useGetMessages;
