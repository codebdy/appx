import { IPlugin } from "../../plugin-sdk/model";
import { rxPlugin } from "./Plugin";

declare const window: Window & { rxPlugin: IPlugin };

(function () {
  // if(window.materials){
  //   console.error("Has material not finished! load error", window.materials)
  // }else{
  window.rxPlugin = rxPlugin
  console.log("Layouts plugin 中")
  // }
})()
