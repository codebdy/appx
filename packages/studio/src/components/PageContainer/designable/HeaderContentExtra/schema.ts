import { Schema } from "../schema";

Schema.HeaderContentExtra = {
  type: 'object',
  properties: {
    gridSpan: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 18,
      },
    },
  },
}
