import { Device } from "@rxdrag/appx-plugin-sdk";
import { ID } from "~/shared";
import { IApp, IAppInput } from "./app";

export enum TemplateType {
  Public = "Public",
  Local = "Local"
}

export interface ITemplateInfo {
  id: ID;
  name?: string;
  uuid?: string;
  imageUrl?: string;
  dependencies?: any;
  schemaJson?: any;
  app?: IApp;
  device?: Device;
  templateType?: TemplateType;
}

export interface ITemplateInfoInput {
  id?: ID;
  name?: string;
  uuid?: string;
  imageUrl?: string;
  dependencies?: any;
  schemaJson?: any;
  app?: { sync?: IAppInput };
  device?: Device;
  templateType?: TemplateType;
}
