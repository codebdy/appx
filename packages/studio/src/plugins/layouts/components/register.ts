import { Device, IMaterialComponent } from "../../../plugin-sdk";

export const pcComponents = []
export const mobileComponents = []
export const webSiteComponents = []

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