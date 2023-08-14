import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import config from "../apiConfig";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const signup = async (
    email,
    password,
    repeatPassword,
    name,
    surname,
    type
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const response = await fetch(`${config.API_BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        repeatPassword,
        name,
        surname,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setSuccess(true);
    }
  };

  return { signup, isLoading, error, success };
};
