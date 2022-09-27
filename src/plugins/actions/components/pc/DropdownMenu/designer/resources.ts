import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'TextSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          'x-component': Name,
        },
      },
    ],
  }
]

export default resources;