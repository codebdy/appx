import { DataBindSourceType, IPropsSchema } from '@rxdrag/appx-plugin-sdk'

const schema: IPropsSchema = {
  display: {
    dataBindSourceType: DataBindSourceType.Multiple,
  },
  props: {
    type: 'object',
    properties: {
      hasHeader: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: true,
        },
      },
      column: {
        type: 'number',
        //'x-decorator': 'FormItem',
        'x-component': 'ColumnsSetter',
        'x-component-props': {
        },
      },
      gutter: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
        },
      },
      hasPagination: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-component-props': {
          defaultChecked: false,
        },
      },
      paginationPosition: {
        type: 'string',
        enum: ['bottomLeft', 'bottomRight', 'bottomCenter'],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          defaultValue: 'bottomCenter',
          optionType: 'button',
        },
        'x-reactions': {
          fulfill: {
            state: {
              hidden: '{{!$form.values["x-component-props"]?.hasPagination}}',
            },
          },
        }
      },
      pageSize: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
        },
        'x-reactions': {
          fulfill: {
            state: {
              hidden: '{{!$form.values["x-component-props"]?.hasPagination}}',
            },
          },
        }
      },
    },
  }

}

export default schema;