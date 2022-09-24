import { Device, IPlugin } from "@rxdrag/appx-plugin-sdk";
import { locales } from "./loacales";
import mobileComponents from "./mobile";
import pcComponents from "./pc";
import websiteComponents from "./website";

export const rxPlugin: IPlugin = {
  id: "predefined.framewidgets",
  title: "FrameWidgets",
  version: "1.0",
  description: "Description",
  components: {
    [Device.PC]: pcComponents,
    [Device.Mobile]: mobileComponents,
    [Device.Website]: websiteComponents,
  },
  model: undefined,
  locales
}