import { useCallback } from "react";
import { IBehavior, IMaterialComponent } from "@appx/plugin-sdk";
import { DnFC } from "@designable/react"
import { createBehavior, createResource } from '@designable/core'
import { Material } from "../model";
import React from "react";
import { useCreateFieldSchema } from "./useCreateFieldSchema";

export function useConvertMaterialFromPlugin() {
  const createFieldSchema = useCreateFieldSchema();
   const convertBehaviors = useCallback((behaviors: IBehavior[]) => {
    return behaviors?.map(behavior => {
      const { schema, ...other } = behavior;
      return {
        ...other,
        designerProps: {
          ...behavior.designerProps,
          propsSchema: createFieldSchema(schema),
        },
      }
    }
    ) || []
  }, [createFieldSchema])

  const transComponment = useCallback((material: IMaterialComponent): Material => {
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
  }, [convertBehaviors])
  
  const convertMaterialFromPlugin = useCallback((material: IMaterialComponent) => {//Material
    return transComponment(material)
  }, [transComponment])

  return convertMaterialFromPlugin;
}