import { Device, IPlugin } from "../../plugin-sdk/model";

export const rxPlugin: IPlugin = {
  id: "predefined.layouts",
  title: "Layouts",
  version: "1.0",
  description: "Description",
  components: {
    [Device.PC]: [],
    [Device.Mobile]: [],
    [Device.Website]: [],
  },
  model: undefined,
}