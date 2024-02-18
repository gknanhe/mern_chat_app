import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contex/AuthContext.jsx";
import { useTokenStore } from "../store/useConersation";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setToken } = useTokenStore();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch(
        "https://chat-app-z859.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // console.log(data.token);
      localStorage.setItem("chat-user", JSON.stringify(data));
      localStorage.setItem("jwt", data.token);
      setAuthUser(data);
      setToken(data.token);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
