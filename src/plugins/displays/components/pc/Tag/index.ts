import { TagDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import  { Tag }  from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: TagDesigner,
  component: Tag,
  behaviors,
  resources
}

export default material;
