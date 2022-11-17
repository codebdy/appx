import { createSchemaField } from '@formily/react'
import {
  FormItem,
  Input,
  NumberPicker,
  DatePicker,
  TimePicker,
  Select,
  Radio,
  Checkbox,
  Switch,
  Space,
  ArrayItems,
  ArrayTable,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
} from '@formily/antd'
import { Slider } from 'antd'
import {
  ImageInput,
  BackgroundImageInput,
  PositionInput,
  CornerInput,
  MonacoInput,
  ValueInput,
  BoxStyleSetter,
  BorderStyleSetter,
  BorderRadiusStyleSetter,
  BoxShadowStyleSetter,
  FontStyleSetter,
  DisplayStyleSetter,
  FlexStyleSetter,
  DrawerSetter,
  CollapseItem,
} from '@designable/react-settings-form'
import SettingsTab from './components/SettingsTab'
import { DataSourceInput, FieldSourceInput, FieldParamsInput, ActionInput, ColumnsSetter } from './components'
import { MultiLangInput } from '~/plugins/inputs/components/pc/MultiLangInput/view'
import IconInput from '~/shared/icon/IconInput'
import { SizeInput } from './components/SizeInput'
import { ColorInput } from './components/ColorInput'
import { BackgroundStyleSetter } from './components/BackgroundStyleSetter'

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    CollapseItem,
    Input,
    ValueInput,
    SizeInput,
    ColorInput,
    ImageInput,
    MonacoInput,
    PositionInput,
    CornerInput,
    BackgroundImageInput,
    BackgroundStyleSetter,
    BoxStyleSetter,
    BorderStyleSetter,
    BorderRadiusStyleSetter,
    DisplayStyleSetter,
    BoxShadowStyleSetter,
    FlexStyleSetter,
    FontStyleSetter,
    DrawerSetter,
    NumberPicker,
    DatePicker,
    TimePicker,
    Select,
    Radio,
    Checkbox,
    Slider,
    Switch,
    Space,
    ArrayItems,
    ArrayTable,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormTab,
    SettingsTab,
    DataSourceInput,
    FieldSourceInput,
    FieldParamsInput,
    MultiLangInput,
    IconInput,
    ActionInput,
    ColumnsSetter
  },
})
