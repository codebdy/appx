import { Device, IPlugin } from "@rxdrag/appx-plugin-sdk";
import { locales } from "./loacales";
import pcComponents from "./components/pc";

export const rxPlugin: IPlugin = {
  id: "predefined.Inputs",
  title: "Inputs",
  version: "1.0",
  description: "Description",
  components: {
    [Device.PC]: pcComponents,
    [Device.Mobile]: [],
    [Device.Website]: [],
  },
  model: undefined,
  locales
}