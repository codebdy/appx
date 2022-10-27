import { Device } from "@rxdrag/appx-plugin-sdk";
import { MetaContent } from "~/AppDesigner/AppUml/meta";
import { ID } from "~/shared";
import { ILang } from "./lang";
import { IMenu } from "./menu";
import { IPage } from "./page";
import { IPageFrame } from "./pageframe";

export interface IAppConfig {
  id: ID;
  app?: IApp;
  schemaJson?: {
    multiLang: {
      open?: boolean,
      langs?: ILang[],
    }
  }
}

export interface IAppDeviceConfig {
  id: ID;
  app?: IApp;
  device?: Device;
  published?: boolean;
  schemaJson?: {
    entryUuid?: string,
    pageFrameUuid?: string,
  }
}


export interface IAppConfigInput {
  id?: ID;
  app?: {
    sync: IAppInput
  };
  schemaJson?: {
    multiLang?: {
      open?: boolean,
      langs?: ILang[],
    }
  }
}

export interface IAppDeviceConfigInput {
  id?: ID;
  app?: {
    sync: IAppInput
  };
  device?: Device;
  published?: boolean;
  schemaJson?: {
    entryId?: string,
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
  pageFrames?: IPageFrame[];
  meta?: MetaContent;
  saveMetaAt?: Date;
  publishedMeta?: MetaContent;
  publishMetaAt?: Date;
  deviceConfigs?: IAppDeviceConfig[];
}

export interface IAppInput {
  id?: ID;
  uuid?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  meta?: MetaContent;
  saveMetaAt?: Date;
  publishedMeta?: MetaContent;
  publishMetaAt?: Date;
  published?: boolean;
}