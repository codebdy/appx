import { IPropsSchema } from "@rxdrag/appx-plugin-sdk";

export const TitleSchema: IPropsSchema = {
  props: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'MultiLangInput',
      },
    }
  }
}
