import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import GridListDesigner from "./designer";
import GridList from "./view";

const material:IMaterialComponent = {
  name: Name,
  designer: GridListDesigner,
  component: GridList,
  behaviors,
  resources
}

export default material;