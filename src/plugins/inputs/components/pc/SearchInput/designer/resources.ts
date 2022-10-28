import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '',
          'x-decorator': 'FormItem',
          'x-component': Name,
          'x-component-props': {
            isFuzzy: true,
            searchStyle: true,
          },
          'x-field-source': [],
        },
      },
    ],
  },
]

export default resources;