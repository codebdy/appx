import { createBehavior } from '@designable/core'
import { ISchema } from '@formily/react'
import { createFieldSchema } from "../../../common/Field";
import { ArrayAddition, ArrayIndex, ArrayMoveDown, ArrayMoveUp, ArrayRemove } from './locales';

export const createArrayBehavior = (name: string, schema: ISchema, locales: any) => {
  return createBehavior(
    {
      name,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === name,
      designerProps: {
        droppable: true,
        propsSchema: createFieldSchema(schema),
      },
      designerLocales: locales,
    },
    {
      name: `${name}.Addition`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Addition`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
        propsSchema: createFieldSchema((schema as any).Addition),
      },
      designerLocales: ArrayAddition,
    },
    {
      name: `${name}.Remove`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Remove`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
        propsSchema: createFieldSchema(undefined),
      },
      designerLocales: ArrayRemove,
    },
    {
      name: `${name}.Index`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Index`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
        propsSchema: createFieldSchema(undefined),
      },
      designerLocales: ArrayIndex,
    },
    {
      name: `${name}.MoveUp`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveUp`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
        propsSchema: createFieldSchema(undefined),
      },
      designerLocales: ArrayMoveUp,
    },
    {
      name: `${name}.MoveDown`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveDown`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === 'ArrayCards'
        },
        propsSchema: createFieldSchema(undefined),
      },
      designerLocales: ArrayMoveDown,
    }
  )
}
