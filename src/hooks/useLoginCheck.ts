import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../consts";
import { useToken } from "../enthooks";

export function useLoginCheck() {
  const navigate = useNavigate();
  const token = useToken()

  useEffect(() => {
    if (!token) {
      navigate(LOGIN_URL);
    }
  }, [token, navigate])
}