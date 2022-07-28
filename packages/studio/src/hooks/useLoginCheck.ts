import { useMatch, useNavigate } from "react-router-dom";
import { useToken } from "../enthooks";

export function useLoginCheck(){
  const navigate = useNavigate();
  const token = useToken();
  const match = useMatch("/login")
  const matchInstall = useMatch("/install")
  if (!token && !match && !matchInstall) {
    navigate("/login");
  }
}