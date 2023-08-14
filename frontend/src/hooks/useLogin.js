import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import config from "../apiConfig";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setIsLoading(false);
        const errorJson = await response.json(); // Parse error response
        setError(errorJson.error);
        return;
      }

      const json = await response.json(); // Parse success response

      setIsLoading(false);
      //save user to localstorage
      localStorage.setItem("user", JSON.stringify(json));
      console.log("LOGIN JSON: ", json);

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred: " + error.message);
    }
  };

  return { login, isLoading, error };
};
