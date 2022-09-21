import { createBehavior, createResource } from '@designable/core'
import { DnFC } from "@designable/react"
import { createFieldSchema } from '../../../../components/common/Field'
import React from 'react'
import { IMaterialComponent } from "@appx/plugin-sdk"
//import { createFieldSchema, FieldsType } from "../../common/Field/shared"

function transComponment(material: IMaterialComponent): DnFC<any> {

  const Behavior = createBehavior({
    ...material.behavior,
    designerProps: {
      ...material.behavior.designerProps,
      propsSchema: createFieldSchema((material.behavior.designerProps as any).propsSchema),
    },
    //selector: (node) => node.props['x-component'] === 'Card',
  })
  const Resource = createResource(material.resource)

  const dnfc: DnFC<any> = (props) => {
    const Component = material.designer as any;
    return (
      <Component
        {...props}
      />
    )
  }

  dnfc.Behavior = Behavior
  dnfc.Resource = Resource
  return dnfc
}


export function convertMaterialsToSources(materials: IMaterialComponent[]) {
  const coms: DnFC<any>[] = []
  for (const material of materials) {
    coms.push(transComponment(material))
  }
  return coms
}