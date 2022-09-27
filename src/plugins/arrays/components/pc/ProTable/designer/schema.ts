import { DataBindSourceType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  display: {
    dataBindSourceType: DataBindSourceType.Multiple,
  },
  props: {
    type: 'object',
    properties: {
      hasQueryForm: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      hasToolbar: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      selectable: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      paginationPosition: {
        type: 'string',
        enum: ['bottomLeft', 'bottomRight', 'bottomCenter'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'bottomRight',
          optionType: 'button',
        },
      },
      pageSize: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
    },
  }
}

export default schema;
