import { MaterialModule, OperationType } from "./model";
import { ArrayTable, Input } from "@formily/antd";
import {
  Button,
  ButtonDesigner,
  InputDesigner,
  PageContainerDesigner,
  PageContainer,
  ProTableDesigner,
  ProTable,
  ArrayTableDesigner,
  TextView,
  TextViewDesigner,
  ObjectContainerDesigner,
  ObjectContainer
} from "../../../components/pc";

export const allMaterials: MaterialModule[] = [
  {
    name: "表单",
    url: "",
    operationType: OperationType.Upload,
    scriptElements: [],
    groups: [
      {
        title: "输入组件",
        materials: [
          {
            name: "Input",
            designer: InputDesigner,
            component: Input,
          },
          {
            name: "PageContainer",
            designer: PageContainerDesigner,
            component: PageContainer,
          },
          {
            name: "ProTable",
            designer: ProTableDesigner,
            component: ProTable
          },
          {
            name: "Button",
            designer: ButtonDesigner,
            component: Button
          },
          {
            name: "ArrayTable",
            designer: ArrayTableDesigner,
            component: ArrayTable
          },
          {
            name: "ObjectContainer",
            designer: ObjectContainerDesigner,
            component: ObjectContainer,
          },
          {
            name: "TextView",
            designer: TextViewDesigner,
            component: TextView
          }
          // {
          //   name: "Rate2",
          //   component: Rate,
          // },
          // {
          //   name: "Password",
          //   component: Password,
          // },
          // {
          //   name: "NumberPicker",
          //   component: NumberPicker,
          // },
          // {
          //   name: "Rate",
          //   component: Rate,
          // },
          // {
          //   name: "Slider",
          //   component: Slider,
          // },
          // {
          //   name: "Select",
          //   component: Select,
          // },
          // {
          //   name: "TreeSelect",
          //   component: TreeSelect,
          // },
          // {
          //   name: "Cascader",
          //   component: Cascader,
          // },
          // {
          //   name: "Transfer",
          //   component: Transfer,
          // },
          // {
          //   name: "Checkbox",
          //   component: Checkbox,
          // },
          // {
          //   name: "Radio",
          //   component: Radio,
          // },
          // {
          //   name: "DatePicker",
          //   component: DatePicker,
          // },
          // {
          //   name: "TimePicker",
          //   component: TimePicker,
          // },
          // {
          //   name: "Upload",
          //   component: Upload,
          // },
          // {
          //   name: "Switch",
          //   component: Switch,
          // },
          // {
          //   name: "ObjectContainer",
          //   component: ObjectContainer,
          // }
        ]
      },
    ]
  }
]