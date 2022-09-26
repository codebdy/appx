import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resource from "./designer/resource";
import Name from "./name";
import Component from "./view";

export default {
  name: Name,
  designer: ComponentDesigner,
  component: Component,
  behaviors,
  resource
}
