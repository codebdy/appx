import { PageContainerSchema } from "../schema";

PageContainerSchema.HeaderContent = {
  type: 'object',
  properties: {
    gridSpan: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        defaultValue: 6,
      },
    },
  },
}
