import { ID } from "~/shared";
import { IAppInput } from "./input";

export enum ProcessType {
  approvalFlow = "approvalFlow",
  workFlow = "workFlow"
}

export interface IProcess {
  id: ID;
  name?: string;
  type?: ProcessType;
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
  type?: ProcessType;
  xml?: string,
  app?: { sync: IAppInput }
}

export interface IProcessInstanceInput {
  id?: ID;
  approvalStatus?: string;
  process?: { sync: IProcessInput };
}