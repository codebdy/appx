import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

const TableToolbarSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      hasActions: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      hasRefresh: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      hasHeight: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      hasSettings: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
    },
  }
}

export default TableToolbarSchema;
