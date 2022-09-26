import { IResourceCreator } from "@designable/core";

const resources: IResourceCreator[] = [{
  icon: 'SpaceSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Space',
      },
    },
  ],
}]

export default resources;