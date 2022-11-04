import { IBehavior } from "@rxdrag/appx-plugin-sdk"
import { ArrayCardsLocales } from "../ArrayCards/designer/locales"
import { ArrayCardsSchema } from "../ArrayCards/designer/schema"
import { ArrayAdditionLocales, ArrayRemoveLocales, ArrayIndexLocales, ArrayMoveUpLocales, ArrayMoveDownLocales } from "./locales"
import { AdditionSchema } from "./schema"

export const createArrayExtraBehavior = (name: string): IBehavior[] => {
  return [
    {
      name: `${name}.Addition`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Addition`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
      },
      designerLocales: ArrayAdditionLocales,
      schema:AdditionSchema,
    },
    {
      name: `${name}.Remove`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Remove`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
      },
      designerLocales: ArrayRemoveLocales,
    },
    {
      name: `${name}.Index`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.Index`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
      },
      designerLocales: ArrayIndexLocales,
    },
    {
      name: `${name}.MoveUp`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveUp`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === name
        },
      },
      designerLocales: ArrayMoveUpLocales,
    },
    {
      name: `${name}.MoveDown`,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === `${name}.MoveDown`,
      designerProps: {
        allowDrop(parent) {
          return parent.props['x-component'] === 'ArrayCards'
        },
      },
      designerLocales: ArrayMoveDownLocales,
    }
  ]
}
