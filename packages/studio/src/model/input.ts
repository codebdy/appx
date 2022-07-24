import { Device, IApp } from ".";
import { ID } from "../shared";

export interface IFileInput {
  id?: ID;
  thumbUrl?: string;
}

export interface IAppInput {
  id?: ID;
  uuid?: string;
  title: string;
  description?: string;
  image?: IFileInput
}

export interface IPageCategoryInput{
  id?: ID;
  title: string;
  device?: Device;
}

export interface IPageInput {
  id?: ID;
  title: string;
  schema: JSON;
  device: Device;
  app: IApp;
}