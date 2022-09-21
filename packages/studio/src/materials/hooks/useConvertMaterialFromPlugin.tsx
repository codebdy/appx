import { useCallback } from "react";
import { IMaterialComponent } from "../../plugin-sdk";
import { DnFC } from "@designable/react"
import { createFieldSchema } from '../../components/common/Field'
import { createBehavior, createResource } from '@designable/core'
import { Material } from "../model";
import React from "react";

function transComponment(material: IMaterialComponent): Material {

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
        { ...props }
      />
    )
  }

  dnfc.Behavior = Behavior
  dnfc.Resource = Resource
  return {
    name: material.name,
    designer: dnfc,
    component: material.component,
  }
}


export function useConvertMaterialFromPlugin() {
  const convertMaterialFromPlugin = useCallback((material: IMaterialComponent) => {//Material
    return transComponment(material)
  }, [])

  return convertMaterialFromPlugin;
}