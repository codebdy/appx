import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'ObjectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'array',
          'x-component': Name,
          'x-component-props': {
            title: `Title`,
          },
        },
      },
    ],
  }
]

export default resources;