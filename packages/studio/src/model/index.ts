import { ID } from "../shared";
import { IMenuItem } from "./IMenuNode";
import { ISchema } from '@formily/json-schema'
import { IUser } from "../enthooks/hooks/useQueryMe";

export enum Device {
  PC = "Pc",
  Mobile = "Mobile",
  Website = "Website"
}

export interface ILang {
  key: string,
  abbr: string,
}

export interface IFile {
  id: ID;
  thumbUrl: string;
}

export interface ILangLocal {
  id: ID;
  name: string;
  appUuid?: string;
  schemaJson?: any;
}

export interface IAppConfig {
  id: ID;
  appUuid?: string;
  schemaJson?: {
    multiLang: {
      open?: boolean,
      langs?: ILang[],
    }
  }
}

export interface IAppDeviceConfig {
  id: ID;
  appUuid?: string;
  device?: Device;
  schemaJson?: {
    entryId?: ID,
  }
}


export interface IApp {
  id: ID;
  uuid: string;
  title: string;
  description?: string;
  pages?: IPage[];
  menus?: IMenu[];
  imageUrl?: string;
  templates?: ITemplate[];
}

export interface ITemplate {
  id: ID;
  title: string;
  schemaJson: { form: any, schema: ISchema };
  device: Device;
  appUuid?: string;
}

export interface IPage {
  id: ID;
  title: string;
  schemaJson: { form: any, schema: ISchema };
  device: Device;
  app: IApp[];
  category?: IPageCategory;
}

export interface IPageCategory {
  id: ID;
  title?: string;
  device?: Device;
  app?: IApp;
}

export interface IMenu {
  id: ID;
  schemaJson: { items: IMenuItem[] };
  device: Device;
  app: IApp;
}

export interface IUserConfig {
  id: ID;
  app?: IApp,
  user?: IUser;
  schemaJson?: {
    [path: string]: any,
  },
}