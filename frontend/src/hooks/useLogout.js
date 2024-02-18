import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../contex/AuthContext";
import { useTokenStore } from "../store/useConersation";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const { setToken } = useTokenStore();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://chat-app-z859.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(data.message);

      localStorage.removeItem("chat-user");
      localStorage.removeItem("jwt");

      setToken(null);

      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
