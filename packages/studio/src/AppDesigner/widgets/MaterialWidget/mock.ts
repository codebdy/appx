import { MaterialModule, OperationType } from "./model";
import { ArrayTable, FormGrid, FormLayout, Input, PreviewText } from "@formily/antd";
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
  ObjectPanelDesigner,
  ObjectPanel,
  FormLayoutDesigner,
  FormGridDesigner,
  FormButtonGroupDesigner,
  FormButtonGroup,
  CardDesigner,
  Card,
  SelectDesigner,
  Select,
  SearchInput,
  SearchInputDesigner,
  DropdownMenuDesigner,
  DropdownMenu,
  DialogDesigner,
  Dialog,
  TextDesigner
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
            name: "SearchInput",
            designer: SearchInputDesigner,
            component: SearchInput,
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
            name: "ObjectPanel",
            designer: ObjectPanelDesigner,
            component: ObjectPanel,
          },
          {
            name: "TextView",
            designer: TextViewDesigner,
            component: TextView
          },
          {
            name: "FormLayout",
            designer: FormLayoutDesigner,
            component: FormLayout,
          },
          {
            name: "FormGrid",
            designer: FormGridDesigner,
            component: FormGrid,
          },
          {
            name: "FormButtonGroup",
            designer: FormButtonGroupDesigner,
            component: FormButtonGroup
          },
          {
            name: "Card",
            designer: CardDesigner,
            component: Card
          },
          {
            name: "Select",
            designer: SelectDesigner,
            component: Select,
          },
          {
            name: "DropdownMenu",
            designer: DropdownMenuDesigner,
            component: DropdownMenu,
          },
          {
            name: "Dialog",
            designer: DialogDesigner,
            component: Dialog
          },
          {
            name: "Text",
            designer: TextDesigner,
            component: PreviewText,
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