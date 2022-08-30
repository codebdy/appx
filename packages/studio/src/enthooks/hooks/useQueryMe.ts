import { gql } from "awesome-graphql-client";

import { useRequest } from "./useRequest";

export interface IUser {
  id: number;
  name: string;
  loginName: string;
  isSupper?: boolean;
  isDemo?: boolean;
}


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

export function useQueryMe(): {
  loading?: boolean,
  error?: Error,
  me?: IUser
} {
  const { data, error, loading } = useRequest(queryGql);
  return { me: data?.me, error, loading }
}