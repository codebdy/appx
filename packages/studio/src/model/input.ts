import { Device } from ".";
import { ID } from "../shared";

export interface IFileInput {
  id?: ID;
  thumbUrl?: string;
}

export interface IAppInput {
  id?: ID;
  uuid?: string;
  title?: string;
  description?: string;
  // image?: IFileInput
}

export interface IPageListInput {
  id?: ID;
  schemaJson: any;
  device: Device;
  app: IAppInput;
}

export interface IPageInput {
  id?: ID;
  title: string;
  schema: JSON;
  device: Device;
  app: IAppInput;
}