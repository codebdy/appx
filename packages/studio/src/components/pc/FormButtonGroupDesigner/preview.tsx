import { DnFC } from '@designable/react'
import { FormButtonGroup, IFormButtonGroupProps } from "../FormButtonGroup";
import { createBehavior, createResource } from '@designable/core'
import { FormButtonGroupLocales } from './locales';
import { createFieldSchema } from "../../common/Field/shared"
import { FormButtonGroupSchema } from './schema';

export const FormButtonGroupDesigner: DnFC<IFormButtonGroupProps> = FormButtonGroup;

FormButtonGroupDesigner.Behavior = createBehavior({
  name: 'FormButtonGroup',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'FormButtonGroup',
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
        type: 'void',
        'x-component': 'FormButtonGroup',
        'x-component-props': {
          formItem: true,
          sticky: false,
        },
      },
    },
  ],
})
