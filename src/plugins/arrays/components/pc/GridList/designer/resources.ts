import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'GridSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
          'x-component-props': {
            hasHeader: true,
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'void',
              'x-component': 'GridList.Header',
            },
          },
        ],
      },
    ],
  }
]

export default resources;