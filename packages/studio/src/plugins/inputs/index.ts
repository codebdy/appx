import { IPlugin } from "@appx/plugin-sdk";
import { rxPlugin } from "./Plugin";

//export * from "./ProLayout"

declare const window: Window & { rxPlugin: IPlugin };

(function () {
  // if(window.materials){
  //   console.error("Has material not finished! load error", window.materials)
  // }else{
  window.rxPlugin = rxPlugin
  console.log("Inputs plugin 中 ")
  // }
})()
