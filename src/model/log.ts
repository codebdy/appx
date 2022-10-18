import { IUser } from "../enthooks";
import { ID } from "../shared";

export enum ModelOperateType {
  query = "query",
  upsert = "upsert",
  delete = "delete",
  inovkeMethod = "inovkeMethod"
}

export enum OperateResult {
  success = "success",
  failure = "failure",
}

export interface IModelLog {
  id: ID;
  user?: IUser;
  ip?: string;
  appUuid?: string;
  createdAt?: Date;
  operateType?: ModelOperateType;
  classUuid?: string;
  className?: string;
  gql?: string;
  result?: OperateResult;
}