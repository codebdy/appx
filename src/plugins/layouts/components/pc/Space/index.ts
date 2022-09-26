import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Space as FormilySpace } from '@formily/antd'

export default {
  name: Name,
  designer: ComponentDesigner,
  component: FormilySpace,
  behaviors,
  resources
}
