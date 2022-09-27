import { IBehavior } from "@rxdrag/appx-plugin-sdk";
import Name from "../name";
import locales from "./locales";
import schema from "./schema";
import _ from "lodash";
import QueryFormSchema from "./QueryFormDesigner/schema";
import { FormGridLocales } from "../../../../../../plugin-sdk";
import QueryFormLocales from "./QueryFormDesigner/locales";
import TableToolbarLocales from "./TableToolbarDesigner/locales";
import TableToolbarSchema from "./TableToolbarDesigner/schema";
import TableToolbarActionsLocales from "./TableToolbarActionsDesigner/locales";
import TableToolbarActionsSchema from "./TableToolbarActionsDesigner/schema";
import TableBatchActionsSchema from "./TableBatchActionsDesigner/schema";
import TableBatchActionsLocales from "./TableBatchActionsDesigner/locales";
import { DataTableColumnGroupLocales, DataTableColumnLocales, DataTableLocales } from "./TableDesigner/locales";
import { ColumnGroupSchema, ColumnSchema, DataTableSchema } from "./TableDesigner/schema";

const behaviors: IBehavior[] = [
  {
    name: Name,
    extends: [],
    selector: (node) => node.props['x-component'] === Name,
    designerProps: {
      droppable: false,
    },
    designerLocales: locales,
    schema
  },
  {
    name: 'ProTable.QueryForm',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.QueryForm',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: _.merge(JSON.parse(JSON.stringify(FormGridLocales)), QueryFormLocales),
    schema: QueryFormSchema,
  },
  {
    name: 'ProTable.Toolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.Toolbar',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: TableToolbarLocales,
    schema: TableToolbarSchema,
  },
  {
    name: 'ProTable.ToolbarActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.ToolbarActions',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: TableToolbarActionsLocales,
    schema: TableToolbarActionsSchema
  },
  {
    name: 'ProTable.BatchActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.BatchActions',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: TableBatchActionsLocales,
    schema: TableBatchActionsSchema,
  },
  {
    name: 'ProTable.Table',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.Table',
    designerProps: {
      droppable: false,
      deletable: false,
      cloneable: false,
      draggable: false,
    },
    designerLocales: DataTableLocales,
    schema: DataTableSchema,
  },
  {
    name: 'ProTable.Column',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.Column',
    designerProps: {
      droppable: true,
      allowDrop: (node) => {
        return (
          (node.props['type'] === 'object' &&
            node.parent?.props?.['x-component'] === 'ProTable.Table') ||
          node?.props?.['x-component'] === 'ProTable.ColumnGroup'
        );
      }
      ,
    },
    designerLocales: DataTableColumnLocales,
    schema: ColumnSchema
  },
  {
    name: 'ProTable.ColumnGroup',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.ColumnGroup',
    designerProps: {
      droppable: true,
      allowDrop: (node) => {
        return (
          (node.props['type'] === 'object' &&
            node.parent?.props?.['x-component'] === 'ProTable.Table') ||
          node?.props?.['x-component'] === 'ProTable.ColumnGroup'
        );
      },
    },
    designerLocales: DataTableColumnGroupLocales,
    schema:ColumnGroupSchema, 
  },
]

export default behaviors