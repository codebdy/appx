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
            hasPagination: true,
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'object',
              'x-component': 'GridList.Header',
            },
          },
          {
            componentName: 'Field',
            props: {
              type: 'array',
              'x-component': 'GridList.Body',
            },
          },
        ],
      },
    ],
  }
]

export default resources;