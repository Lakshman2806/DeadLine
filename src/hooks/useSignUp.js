import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";

export const useSignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setLoading(false);
    }
    if (response.ok) {
      

      // saving the token in the local storage
      // if the user refreshes/closes the page, the token will be available
      localStorage.setItem("user", JSON.stringify(data));

      // dispatching the action to the reducer
        dispatch({ type: "LOGIN", payload: data });

        setLoading(false);
    }
  };

    return { signup, error, loading };
};
