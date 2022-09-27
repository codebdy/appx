import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";
import { FormGridSchema } from "../../../../../../../plugin-sdk";

const QueryFormSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      collapsiable: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
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
          defaultChecked: true,
        },
      },
      ...(FormGridSchema.properties as any),
    },
  }
}

export default QueryFormSchema
