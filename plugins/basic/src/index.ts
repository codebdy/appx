import { categories } from "./config";
import { ComponentCategory } from "./types";

export * from "./config"

declare const window: Window & { materials: ComponentCategory[] };

(function () {
  // if(window.materials){
  //   console.error("Has material not finished! load error", window.materials)
  // }else{
  window.materials = categories
  console.log("plug in 中", categories)
  // }
})()
