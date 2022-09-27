import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { locales } from "./loacales";
import components from "./components";

export const rxPlugin: IPlugin = {
  id: "predefined.actions",
  title: "Actions",
  version: "1.0",
  description: "Description",
  components: components,
  model: undefined,
  locales
}