import { mobileComponents, pcComponents, webSiteComponents } from "./components";
import { locales } from "./loacales";

export const rxPlugin: IPlugin = {
  id: "predefined.layouts",
  title: "Layouts",
  version: "1.0",
  description: "Description",
  components: {
    [Device.PC]: pcComponents,
    [Device.Mobile]: mobileComponents,
    [Device.Website]: webSiteComponents,
  },
  model: undefined,
  locales
}