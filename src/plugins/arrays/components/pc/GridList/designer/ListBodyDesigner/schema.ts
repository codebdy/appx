import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

export const ListBodySchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      grid: {
        type: 'number',
        //'x-decorator': 'FormItem',
        'x-component': 'ColumnsSetter',
        'x-component-props': {
          defaultValue: {
            column: 4
          }
        },
      },
      gutter: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          defaultValue: 16
        },
      },
    },
  }
}
