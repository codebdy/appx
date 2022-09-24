import { Device, IPlugin } from "@rxdrag/appx-plugin-sdk";
import { locales } from "./loacales";
import { mobileFrameworks } from "./mobile";
import { pcFrameworks } from "./pc";
import { websiteFrameworks } from "./website";

export const rxPlugin: IPlugin = {
  id: "predefined.frameworks",
  title: "Frameworks",
  version: "1.0",
  description: "Description",
  components: {
    [Device.PC]: pcFrameworks,
    [Device.Mobile]: mobileFrameworks,
    [Device.Website]: websiteFrameworks,
  },
  model: undefined,
  locales
}