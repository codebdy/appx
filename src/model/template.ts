import { Device } from "@rxdrag/appx-plugin-sdk";
import { ID } from "~/shared";
import { IApp, IAppInput } from "./app";

export enum CategoryType {
  Public = "Public",
  Local = "Local"
}

export enum TemplateType {
  Frame = "Frame",
  Page = "Page"
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
  categoryType?: CategoryType;
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
  categoryType?: CategoryType;
  templateType?: TemplateType;
}
