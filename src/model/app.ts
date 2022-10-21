import { Device } from "@rxdrag/appx-plugin-sdk";
import { MetaContent } from "~/AppDesigner/AppUml/meta";
import { ID } from "~/shared";
import { ILang } from "./lang";
import { IMenu } from "./menu";
import { IPage } from "./page";
import { IPageFrame } from "./pageframe";

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
    pageFrameId?: ID,
  }
}


export interface IAppConfigInput {
  id?: ID;
  appUuid?: string;
  schemaJson?: {
    multiLang?: {
      open?: boolean,
      langs?: ILang[],
    }
  }
}

export interface IAppDeviceConfigInput {
  id?: ID;
  appUuid?: string;
  device?: Device;
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
  publishedMeta?: MetaContent;
}

export interface IAppInput {
  id?: ID;
  uuid?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  // image?: IFileInput
}