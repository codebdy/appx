import { useSetToken } from "../context";
import { gql } from 'awesome-graphql-client'
import { useLazyRequest } from "./useLazyRequest";

const logoutMutation = gql`
  mutation {
    logout
  }
`;

export function useLogout(): [
  (data?: any) => void,
  { loading?: boolean; error?: Error }
] {

  const setConfigToken = useSetToken();

  const [logout, { loading, error }] = useLazyRequest(logoutMutation, {
    onCompleted: (data: any) => {
      setConfigToken(undefined);
    },
  })

  return [logout, { loading, error }];
}
