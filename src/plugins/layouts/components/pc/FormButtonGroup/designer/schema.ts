import { IPropsSchema } from '@rxdrag/appx-plugin-sdk';

const schema: IPropsSchema = {
  display:{ 
    
  },
  props: {
    type: 'object',
    properties: {
      formItem: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      sticky: {
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      align: {
        type: 'string',
        enum: ['left', 'right', 'center'],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          defaultValue: 'left',
        },
      },
      gutter: {
        type: 'number',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
    },
  }

}

export default schema;
