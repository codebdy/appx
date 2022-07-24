import { MaterialModule, OperationType } from "./model";

import {
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '@designable/formily-antd'

export const allMaterials: MaterialModule[] = [
  {
    name: "表单",
    url:"",
    operationType:OperationType.Upload,
    scriptElements:[],
    groups: [
      {
        title: "输入组件",
        materials: [
          {
            name: "Input",
            component: Input,
          },
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