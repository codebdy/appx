import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../consts";
import { useToken } from "../enthooks";

export function useLoginCheck() {
  const navigate = useNavigate();
  const token = useToken()
  if (!token) {
    navigate(LOGIN_URL);
  }  
}