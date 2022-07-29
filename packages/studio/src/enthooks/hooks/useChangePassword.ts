import { gql } from 'awesome-graphql-client'
import { RequestOptions, useLazyRequest } from './useLazyRequest';

const changePasswordMutation = gql`
  mutation changePassword($loginName: String!, $oldPassword: String!, $password: String!) {
    changePassword(loginName: $loginName, oldPassword: $oldPassword!,  password: $password)
  }
`;


export interface ChangeInput {
  loginName: string;
  oldPassword: string;
  newPassword: string;
}

export function useChangePassword(
  options?: RequestOptions<boolean>
): [
    (input: ChangeInput) => void,
    { success?: boolean; loading?: boolean; error?: Error }
  ] {
  const [change, { data, error, loading }] = useLazyRequest<ChangeInput>(changePasswordMutation, {
    onCompleted: (data: any) => {
      options?.onCompleted && options?.onCompleted(data?.changePassword);
    },
    onError: (error) => {
      options?.onError && options?.onError(error);
    }
  })

  return [change, { success:data?.changePassword, loading, error }];
}
