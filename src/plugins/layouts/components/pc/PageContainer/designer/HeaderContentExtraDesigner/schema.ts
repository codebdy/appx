import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

const HeaderContentExtraSchema: IPropsSchema = {
  props: {
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

}

export default HeaderContentExtraSchema;
