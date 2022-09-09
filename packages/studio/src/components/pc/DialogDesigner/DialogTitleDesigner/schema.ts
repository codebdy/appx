import { DialogSchema } from "../schema";

DialogSchema.Title = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'MultiLangInput',
    },
  }
}
