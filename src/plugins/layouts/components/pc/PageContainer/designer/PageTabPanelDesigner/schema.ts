import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

const TabPanelSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'MultiLangInput',
        'x-component-props': {
        },
      },
    },
  }
}

export default TabPanelSchema;
