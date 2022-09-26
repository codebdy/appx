import { IPlugin } from "@rxdrag/appx-plugin-sdk";
import { rxPlugin } from "./Plugin";

//export * from "./ProLayout"

declare const window: Window & { rxPlugin: IPlugin };
(function () {
  window.rxPlugin = rxPlugin
  console.log("Inputs plugin 中 ")
})()
