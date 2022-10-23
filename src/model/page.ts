import { ISchema } from "@formily/react";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { ID } from "~/shared";
import { IApp, IAppInput } from "./app";

export interface IPageCategory {
  id: ID;
  title?: string;
  device?: Device;
  app?: IApp;
}


export interface IPage {
  id: ID;
  title: string;
  schemaJson: { form: any, schema: ISchema };
  device: Device;
  app?: IApp;
  category?: IPageCategory;
}

export interface IPageCategoryInput {
  id?: ID;
  title?: string;
  device?: Device;
  app?: { sync: IAppInput };
}

export interface IPageInput {
  id?: ID;
  title?: string;
  schemaJson?: any;
  device?: Device;
  app?: { sync: IAppInput };
  category?: { sync: IPageCategoryInput };
}