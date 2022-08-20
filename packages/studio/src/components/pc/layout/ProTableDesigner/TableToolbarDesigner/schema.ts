import { FormGridSchema } from "../../../form/FormGridDesigner/schema";
import { ProTableSchema } from "../schema";

ProTableSchema.TableToolbar = {
  type: 'object',
  properties: {
    title: {
      type: 'strig',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    hasNewButton: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
  },
}
