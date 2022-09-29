import { Device } from "@rxdrag/appx-plugin-sdk";
import pcComponents from "./pc";

const components = {
  [Device.PC]: pcComponents,
  [Device.Mobile]: [],
  [Device.Website]: [],
}

export default components;