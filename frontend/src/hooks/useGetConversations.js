import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTokenStore } from "../store/useConersation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { token } = useTokenStore();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      if (token) {
        // console.log("token in get con", token);
        try {
          const res = await fetch("http://localhost:8000/api/users", {
            method: "GET", // Adjust method as needed

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Or appropriate content type
            },
          });
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setConversations(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getConversations();
  }, [token]);

  return { loading, conversations };
};
export default useGetConversations;
