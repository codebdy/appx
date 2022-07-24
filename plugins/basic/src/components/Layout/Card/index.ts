import { IApperComponent } from "src/types"
import { Card as AntdCard } from 'antd'
import { CardDesigner } from "./designer"
import { schema } from "./schema"
import { locales } from "./locales"

const Card: IApperComponent = {
  name: "Card",
  xComponent: AntdCard,
  xDesigner: CardDesigner,
  behavior: {
    name: 'Card',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Card',
    designerProps: {
      droppable: true,
      propsSchema: schema,
    },
    designerLocales: locales,
  },
  resource: {
    icon: 'CardSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'Card',
          'x-component-props': {
            title: 'Title',
          },
        },
      },
    ],
  }
}

export default Card