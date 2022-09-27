import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'ButtonSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          title: 'Button',
          'x-component': Name,
          'x-component-props': {
            type: "primary",
            title: "Button"
          },
        },
      },
    ],
  }
]

export default resources;