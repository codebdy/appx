import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'ObjectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'object',
          'x-component': Name,
        },
      },
    ],
  }
]

export default resources;