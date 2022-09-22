import { IPlugin } from "@appx/plugin-sdk";
import { IPluginInfo } from "../model";


export enum PluginType {
  Predefined = "predefined",
  Normal = "normal",
  Debug = "debug"
}

export interface IInstalledPlugin {
  pluginInfo: IPluginInfo;
  plugin?: IPlugin;
  type: PluginType;
}
