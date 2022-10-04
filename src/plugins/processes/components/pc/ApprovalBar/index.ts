import { ApprovalBarDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import  { ApprovalBar }  from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: ApprovalBarDesigner,
  component: ApprovalBar,
  behaviors,
  resources
}

export default material;
