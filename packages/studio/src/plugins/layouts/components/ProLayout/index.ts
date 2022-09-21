import { Device } from "@appx/plugin-sdk"
import mobile from "./mobile"
import pc from "./pc"
import website from "./website"

export const ProLayout = {
  [Device.PC]: pc,
  [Device.Mobile]: mobile,
  [Device.Website]: website,
}
