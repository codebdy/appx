import { gql } from 'awesome-graphql-client'
import { useState } from "react";
import { useSetToken } from '../context';
import { useLazyRequest } from './useLazyRequest';

const loginMutation = gql`
  mutation login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export interface LoginOptions {
  onCompleted?: (access_token: string) => void;
  onError?: (error?: Error) => void;
}

export interface LoginInput {
  loginName: string;
  password: string;
}

export function useLogin(
  options?: LoginOptions
): [
    (input:LoginInput) => void,
    { token?: string; loading?: boolean; error?: Error }
  ] {
  const [token, setToken] = useState<string>()
  const setConfigToken = useSetToken();
  const [login, { error, loading }] = useLazyRequest<LoginInput, any>(loginMutation, {
    onCompleted: (data: any) => {
      setToken(data.login);
      setConfigToken(data.login);
      options?.onCompleted && options?.onCompleted(data.login);
    },
    onError: (error) => {
      options?.onError && options?.onError(error);
    }
  })

  return [login, { token, loading, error }];
}
