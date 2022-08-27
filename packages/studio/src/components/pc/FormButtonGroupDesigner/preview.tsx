import { DnFC } from '@designable/react'
import { FormButtonGroup, IFormButtonGroupProps } from "../FormButtonGroup";
import { createBehavior, createResource } from '@designable/core'
import { FormButtonGroupLocales } from './locales';
import { createFieldSchema } from "../../common/Field/shared"
import { FormButtonGroupSchema } from './schema';

export const FormButtonGroupDesigner: DnFC<IFormButtonGroupProps> = FormButtonGroup;

FormButtonGroupDesigner.Behavior = createBehavior({
  name: 'Object',
  extends: ['Field'],
  selector: (node) => node.props.type === 'object',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(
      FormButtonGroupSchema,
      {
        noStyleTab: true,
        noDisplayTab: true,
      }
    ),
  },
  designerLocales: FormButtonGroupLocales,
})

FormButtonGroupDesigner.Resource = createResource({
  icon: 'SubmitButtonSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'FormButtonGroupD',
        'x-component-props': {
          formItem: true,
          sticky: false,
        },
      },
    },
  ],
})
