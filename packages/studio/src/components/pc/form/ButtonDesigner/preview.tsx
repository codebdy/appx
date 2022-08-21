import { Button, IButtonProps } from "../Button";
import { createFieldSchema } from "../../../common/Field";
import { createBehavior, createResource } from '@designable/core'
import { ButtonSchema } from "./schema";
import { ButtonLocales } from "./locales";
import { DnFC } from '@designable/react'
import { Actions } from "../../../../shared/action/actions";

export const ButtonDesigner: DnFC<IButtonProps> = Button

ButtonDesigner.Behavior = createBehavior({
  name: 'Button',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Button',
  designerProps: {
    propsSchema: createFieldSchema(ButtonSchema, { actions: [Actions.Click] }),
  },
  designerLocales: ButtonLocales,
})

ButtonDesigner.Resource = createResource({
  //icon: ButtonSource,
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        title: 'Button',
        'x-component': 'Button',
        'x-component-props': {
          type: "primary",
          title: "Button"
        },
      },
    },
  ],
})