import { Device, IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import { mobileComponents, pcComponents, webSiteComponents } from ".";

function putInArray(arr: Array<IMaterialComponent>, com?: IMaterialComponent) {
  if (com) {
    arr.push(com)
  }
}

export function register(obj: {
  [device: string]: IMaterialComponent
}) {
  putInArray(pcComponents, obj[Device.PC])
  putInArray(mobileComponents, obj[Device.Mobile])
  putInArray(webSiteComponents, obj[Device.Website])
}