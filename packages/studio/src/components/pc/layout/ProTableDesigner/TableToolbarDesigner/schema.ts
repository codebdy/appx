import { FormGridSchema } from "../../../form/FormGridDesigner/schema";
import { ProTableSchema } from "../schema";

ProTableSchema.TableToolbar = {
  type: 'object',
  properties: {
    collapsiable: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultValue: true,
      },
    },
    layout: {
      type: 'string',
      enum: ['vertical', 'horizontal', 'inline', null],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'horizontal',
      },
    },
    maxRowsOnCollapsed: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 1,
      },
    },
    colon: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultValue: true,
      },
    },
    ...(FormGridSchema.properties as any)
  },
}