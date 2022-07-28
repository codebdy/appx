import { gql } from "awesome-graphql-client";
import { RequestOptions, useLazyRequest } from "./useLazyRequest";

export interface InstallInput {
  admin: string;
  password: string;
  withDemo: boolean;
  meta: JSON;
}

const installMutation = gql`
  mutation install($input: InstallInput!) {
    install(input: $input)
  }
`;

export function useInstall(options?:RequestOptions<any>) :[
  (input:InstallInput)=>void,
  {
    error?:Error,
    loading?:boolean,
  }
]
{
  const [install, {error, loading}] = useLazyRequest(installMutation, options)

  return [install, {error, loading}];
}