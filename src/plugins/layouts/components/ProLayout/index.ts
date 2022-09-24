import { Device } from "@rxdrag/appx-plugin-sdk"
import mobile from "./mobile"
import pc from "./pc"
import website from "./website"

export default {
  [Device.PC]: pc,
  [Device.Mobile]: mobile,
  [Device.Website]: website,
}
