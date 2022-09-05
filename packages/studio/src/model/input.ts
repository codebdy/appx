import { Device, IApp, ILang } from ".";
import { IUser } from "../enthooks/hooks/useQueryMe";
import { ID } from "../shared";

export interface IFileInput {
  id?: ID;
  thumbUrl?: string;
}
export interface ILangLocalInput {
  id?: ID;
  name?: string;
  appUuid?: string;
  schemaJson?: any;
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


export interface IAppInput {
  id?: ID;
  uuid?: string;
  title?: string;
  description?: string;
  // image?: IFileInput
}

export interface IPageCategoryInput {
  id?: ID;
  title?: string;
  device?: Device;
  app?: IAppInput[];
}

export interface IPageInput {
  id?: ID;
  title?: string;
  schemaJson?: any;
  device?: Device;
  app?: IAppInput[];
  category?: IPageCategoryInput[];
}

export interface IMenuInput {
  id?: ID;
  device?: Device;
  schemaJson?: any;
  app?: IAppInput[];
}

export interface IUserConfigInput {
  id?: ID;
  app?: IApp[];
  user?: IUser[];
  schemaJson?: {
    [path: string]: any,
  },
}