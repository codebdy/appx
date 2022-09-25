import { ILang, PluginType } from ".";
import { Device, IMaterialTab } from "@rxdrag/appx-plugin-sdk";
import { ID } from "../shared";

export interface IUserInput {
  id?: ID;
}

export interface IFileInput {
  id?: ID;
  thumbUrl?: string;
}
export interface ILangLocalInput {
  id?: ID;
  name?: string;
  appUuid?: string;
  schemaJson?: any;
  pluginId: string;
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

export interface IPluginInfoInput {
  id?: ID;
  appUuid?: string;
  title?: string;
  url?: string;
  type?: PluginType,
  description?: string;
  version?: string;
}

export interface IPageFrameInput {
  id?: ID;
  title?: string;
  schemaJson?: any;
  device?: Device;
  appUuid?: string;
}

export interface IAppInput {
  id?: ID;
  uuid?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  //templates?: { sync?: IPageFrameInput[] }
  // image?: IFileInput
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

export interface IMenuInput {
  id?: ID;
  device?: Device;
  schemaJson?: any;
  app?: { sync: IAppInput };
}

export interface IUserConfigInput {
  id?: ID;
  app?: { sync: IAppInput };
  user?: { sync: IUserInput };
  schemaJson?: {
    [path: string]: any,
  },
}

export interface IMaterialConfigInput {
  id?: ID;
  appUuid?: string,
  device?: Device,
  schemaJson?: {
    tabs: IMaterialTab[],
  },
}