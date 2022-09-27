import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

const HeaderContentSchema: IPropsSchema = {
  props: {
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
}

export default HeaderContentSchema;
