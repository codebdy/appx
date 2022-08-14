import { Device, ILang } from ".";
import { ID } from "../shared";

export interface IFileInput {
  id?: ID;
  thumbUrl?: string;
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
