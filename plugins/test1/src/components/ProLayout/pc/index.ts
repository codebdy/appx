import { IMaterialComponent } from "../../../../../plugin-sdk";
import { NAME } from "../consts";
import { ProLayoutDesigner } from "./designer";
import { behaviors } from "./designer/behaviors";
import { resource } from "./designer/resource";
import { ProLayout } from "./view";

const pc: IMaterialComponent = {
  name: NAME,
  designer: ProLayoutDesigner,
  component: ProLayout,
  behaviors,
  resource
}

export default pc;