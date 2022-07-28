import { useToken } from "../context";

export function useQuery(){
  const token = useToken()
  console.log(token)
}