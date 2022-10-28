import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'SpaceSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': Name,
        },
      },
    ],
  }
]

export default resources;