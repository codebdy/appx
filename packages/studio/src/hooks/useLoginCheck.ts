import { useMatch, useNavigate } from "react-router-dom";
import { INSTALL_URL, LOGIN_URL } from "../consts";
import { useToken } from "../enthooks";

export function useLoginCheck(){
  const navigate = useNavigate();
  const token = useToken();
  const match = useMatch(LOGIN_URL)
  const matchInstall = useMatch(INSTALL_URL)
  if (!token && !match && !matchInstall) {
    navigate(LOGIN_URL);
  }
}