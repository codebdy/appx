import { gql } from "awesome-graphql-client";
import { IUser } from "../../recoil/atoms";
import { useRequest } from "./useRequest";

const queryGql = gql`
  query{
    me
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