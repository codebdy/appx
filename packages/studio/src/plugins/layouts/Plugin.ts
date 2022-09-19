import { Device, IPlugin } from "../../plugin-sdk/model";

export const rxPlugin: IPlugin = {
  id: "predefined.layouts",
  title: "Title",
  version: "1.0",
  description: "Description",
  components: {
    [Device.PC]: [],
    [Device.Mobile]: [],
    [Device.Website]: [],
  },
  model: undefined,
}