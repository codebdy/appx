import { Device } from "@rxdrag/appx-plugin-sdk";
import { ID } from "~/shared";
import { IApp } from "./app";

export enum TemplateType {
  Public = "Public",
  Local = "Local"
}

export interface ITemplateInfo {
  id?: ID;
  name?: string;
  uuid?: string;
  imageUrl?: string;
  dependencies?: any;
  schemaJson?: any;
  app?: IApp;
  device?: Device;
  type?: TemplateType;
}
