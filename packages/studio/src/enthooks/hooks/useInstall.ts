import { useCallback } from "react";
import { RequestOptions } from "./useLazyRequest";

export interface InstallInput {
  admin: string;
  password: string;
  withDemo: boolean;
  meta: JSON;
}

export function useInstall(options?:RequestOptions<any>) :[
  (input:InstallInput)=>void,
  {
    error?:Error,
    loading?:boolean,
  }
]
{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const install = useCallback((input:InstallInput) => {

  }, [])

  return [install, {}];
}