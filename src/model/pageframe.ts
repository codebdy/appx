import { ISchema } from "@formily/react";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { ID } from "~/shared";
import { IApp, IAppInput } from "./app";

export interface IPageFrame {
  id: ID;
  title: string;
  uuid: string;
  schemaJson: { form: any, schema: ISchema };
  device: Device;
  app?: IApp;
}

export interface IPageFrameInput {
  id?: ID;
  title?: string;
  uuid?: string;
  schemaJson?: any;
  device?: Device;
  app?: { sync: IAppInput };
}
