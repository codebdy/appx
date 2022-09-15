import { createFieldSchema, FieldsType } from "../../common/Field";
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { MediasSchema } from "./schema";
import { MediasLocales } from "./locales";
import { ImageUploaderProps, ImageUploader } from "../preview/pc";

export const ImageUploaderDesigner: DnFC<ImageUploaderProps> = ImageUploader

ImageUploaderDesigner.Behavior = createBehavior({
  name: 'ImageUploader',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ImageUploader',
  designerProps: {
    propsSchema: createFieldSchema(MediasSchema, { fieldSourceType: FieldsType.Single }),
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
        title: 'Image',
        'x-decorator': 'FormItem',
        'x-component': 'ImageUploader',
        'x-component-props': {
          title: "Upload"
        },
      },
    },
  ],
})