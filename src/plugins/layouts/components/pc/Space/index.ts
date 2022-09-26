import { Device, IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resource from "./designer/resource";
import Name from "./name";
import { Space as FormilySpace } from '@formily/antd'

export default {
  name: Name,
  designer: ComponentDesigner,
  component: FormilySpace,
  behaviors,
  resource
}
