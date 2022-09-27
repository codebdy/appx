import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import  Component  from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Component,
  behaviors,
  resources
}

export default material;
