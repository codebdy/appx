import { gql } from 'awesome-graphql-client'
import { useCallback } from 'react';
import { RequestOptions, useLazyRequest } from './useLazyRequest';

const changePasswordMutation = gql`
  mutation changePassword($loginName: String!, $oldPassword: String!, $newPassword: String!) {
    changePassword(loginName: $loginName, oldPassword: $oldPassword,  newPassword: $newPassword)
  }
`;


export interface ChangeInput {
  loginName: string;
  oldPassword: string;
  newPassword: string;
}

export function useChangePassword(
  options?: RequestOptions<string>
): [
    (input: ChangeInput) => void,
    { token?: string; loading?: boolean; error?: Error }
  ] {
  const [doChange, { data, error, loading }] = useLazyRequest<ChangeInput>({
    onCompleted: (data: any) => {
      options?.onCompleted && options?.onCompleted(data?.changePassword);
    },
    onError: (error) => {
      options?.onError && options?.onError(error);
    }
  })

  const change = useCallback(()=>{
    doChange(changePasswordMutation)
  }, [doChange])
  return [change, { token:data?.changePassword, loading, error }];
}
