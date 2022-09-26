import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'SelectSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'Select',
          'x-decorator': 'FormItem',
          'x-component': Name,
          'x-component-props': {
            'labelField': 'name',
            'valueField': 'id',
          }
        },
      },
    ],
  }
]

export default resources;