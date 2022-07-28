import { useToken } from "@appx/enthooks";
import { useMatch, useNavigate } from "react-router-dom";

export function useLoginCheck(){
  const navigate = useNavigate();
  const token = useToken();
  const match = useMatch("/login")
  if (!token && !match) {
    navigate("/login");
  }
}