import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { locales } from "./loacales";
import components from "./components";

export const rxPlugin: IPlugin = {
  id: "predefined.processes",
  title: "Processes",
  version: "1.0",
  description: "Description",
  components: components,
  model: undefined,
  locales
}