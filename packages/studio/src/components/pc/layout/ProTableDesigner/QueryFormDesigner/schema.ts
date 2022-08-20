import { ProTableSchema } from "../schema";

ProTableSchema.QueryForm = {
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
  },
}
