import { createFieldSchema } from "../../common/Field";
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { IMediasProps, Medias } from "../preview/pc";
import { MediasSchema } from "./schema";
import { MediasLocales } from "./locales";

export const MediasDesigner: DnFC<IMediasProps> = Medias

MediasDesigner.Behavior = createBehavior({
  name: 'Medias',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Medias',
  designerProps: {
    propsSchema: createFieldSchema(MediasSchema),
  },
  designerLocales: MediasLocales,
})

MediasDesigner.Resource = createResource({
  icon: 'MediaSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        //title: '',
        'x-component': 'Medias',
        'x-component-props': {
        },
      },
    },
  ],
})