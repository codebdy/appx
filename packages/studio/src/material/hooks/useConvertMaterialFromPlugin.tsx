import { useCallback } from "react";
import { IMaterialComponent } from "../../plugin-sdk";
import { DnFC } from "@designable/react"
import { createFieldSchema } from '../../components/common/Field'
import { createBehavior, createResource, IBehaviorCreator } from '@designable/core'
import { Material } from "../model";
import React from "react";

function convertBehaviors(behaviors: IBehaviorCreator[]) {
  return behaviors?.map(behavior => {
    return {
      ...behavior,
      designerProps: {
        ...behavior.designerProps,
        propsSchema: createFieldSchema((behavior.designerProps as any).propsSchema),
      },
      //selector: (node) => node.props['x-component'] === 'Card',
    }
  }
  ) || []
}

function transComponment(material: IMaterialComponent): Material {
  const Resource = createResource(material.resource)

  const dnfc: DnFC<any> = (props) => {
    const Component = material.designer as any;
    return (
      <Component
        {...props}
      />
    )
  }
  if (material.behaviors) {
    const Behavior = createBehavior(...convertBehaviors(material.behaviors))
    dnfc.Behavior = Behavior
  }

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