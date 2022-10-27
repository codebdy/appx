import { ID } from "~/shared";
import { IAppInput } from "./app";


export interface IProcessCategory {
  id: ID;
  uuid: string;
  name?: string;
}

export interface IProcess {
  id: ID;
  uuid: string;
  name?: string;
  categoryUuid?: string;
  xml?: string,
  instances?: IProcessInstance[];
}

export interface IProcessInstance {
  id: ID;
  approvalStatus?: string;
  process?: IProcess;
}

export interface IProcessInput {
  id?: ID;
  name?: string;
  categoryuuid?: string;
  xml?: string,
  app?: { sync: IAppInput }
}

export interface IProcessInstanceInput {
  id?: ID;
  approvalStatus?: string;
  process?: { sync: IProcessInput };
}