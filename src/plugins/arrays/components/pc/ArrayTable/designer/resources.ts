import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'ArrayTableSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'array',
          'x-decorator': 'FormItem',
          'x-component': Name,
        },
      },
    ],
  }
]

export default resources;