import { gql } from "awesome-graphql-client";
import { IUser } from "../../recoil/atoms";
import { useRequest } from "./useRequest";

const queryGql = gql`
  query{
    me{
      id
      name
      loginName
      isSupper
      isDemo
    }
  }
`;

export function useMe(): {
  loading?: boolean,
  error?: Error,
  me?: IUser
} {
  const { data, error, loading } = useRequest(queryGql);
  return { me: data?.me, error, loading }
}