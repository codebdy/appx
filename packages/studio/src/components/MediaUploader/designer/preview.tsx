import { createFieldSchema } from "../../common/Field";
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { MediasSchema } from "./schema";
import { MediasLocales } from "./locales";
import { IImageUploaderProps, ImageUploader } from "../preview/pc";

export const ImageUploaderDesigner: DnFC<IImageUploaderProps> = ImageUploader

ImageUploaderDesigner.Behavior = createBehavior({
  name: 'ImageUploader',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ImageUploader',
  designerProps: {
    propsSchema: createFieldSchema(MediasSchema),
  },
  designerLocales: MediasLocales,
})

ImageUploaderDesigner.Resource = createResource({
  icon: 'ImageSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        //title: '',
        'x-component': 'ImageUploader',
        'x-component-props': {
        },
      },
    },
  ],
})