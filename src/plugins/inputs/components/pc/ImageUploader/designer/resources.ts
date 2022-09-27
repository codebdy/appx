import { IResourceCreator } from "@designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'UploadSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          title: 'Image',
          'x-decorator': 'FormItem',
          'x-component': Name,
          'x-component-props': {
            title: "Upload"
          },
        },
      },
    ],
  }
]

export default resources;