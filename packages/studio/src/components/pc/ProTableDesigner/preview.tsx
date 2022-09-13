import { observer } from "@formily/reactive-react"
import { Card, TableProps } from "antd"
import React from "react"
import { IQueryFormProps } from "../ProTable/QueryForm"
import { ITableToolbarProps } from "../ProTable/TableToolbar"
import { DnFC, TreeNodeWidget } from '@designable/react'
import { QueryFormDesigner } from "./QueryFormDesigner"
import { IProTableProps } from "../ProTable"
import { createBehavior, createResource } from '@designable/core'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { ProTableSchema } from "./schema"
import { ProTableLocales } from "./locales"
import clx from "classnames"
import { useFindNode } from "../../common/hooks/useFindNode"
import _ from "lodash"
import { FormGridLocales } from "../FormGridDesigner/locales"
import { TableToolbarDesigner } from "./TableToolbarDesigner"
import { TableBatchActionsDesigner } from "./TableBatchActionsDesigner"
import { ITableBatchActionsProps } from "../ProTable/TableBatchActions"
import { DataTableColumnGroupLocales, DataTableColumnLocales, DataTableLocales } from "./TableDesigner/locales"
import { DataTableSchema } from "./TableDesigner/schema"
import { TableDesigner } from "./TableDesigner"
import { IndexDesigner } from "./TableDesigner/IndexDesigner"
import { ProTableContext } from "../ProTable/context"
import { ITableToolbarContentProps } from "../ProTable/TableToolbarContent"
import { ITableToolbarActionsProps } from "../ProTable/TableToolbarActions"
import { TableToolbarContentDesigner } from "./TableToolbarContentDesigner"
import { TableToolbarActionsDesigner } from "./TableToolbarActionsDesigner"

export const ProTableDesigner: DnFC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  Toolbar?: React.FC<ITableToolbarProps>,
  ToolbarContent?: React.FC<ITableToolbarContentProps>,
  ToolbarActions?: React.FC<ITableToolbarActionsProps>,
  BatchActions?: React.FC<ITableBatchActionsProps>,
  Table?: React.FC<TableProps<any>>,
  Index?: React.FC,
} = observer((props: IProTableProps) => {
  const {
    hasQueryForm = true,
    hasToolbar = true,
    selectable = true,
    className,
    dataBind: dataSource,
    ...other
  } = props;

  const queryForm = useFindNode('QueryForm');
  const toolbar = useFindNode("Toolbar");
  const batchActions = useFindNode("BatchActions");
  const dataTable = useFindNode("Table");

  return (
    <ProTableContext.Provider value={{ selectable }}>
      <div className={clx("appx-pro-table", className)} {...other}>
        {
          hasQueryForm && queryForm && <TreeNodeWidget node={queryForm} />
        }
        <Card style={{ marginTop: "16px" }}>
          {
            hasToolbar && toolbar && <TreeNodeWidget node={toolbar} />
          }
          {
            selectable && batchActions && <TreeNodeWidget node={batchActions} />
          }

          <TreeNodeWidget node={dataTable} />
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})

ProTableDesigner.QueryForm = QueryFormDesigner;
ProTableDesigner.Toolbar = TableToolbarDesigner;
ProTableDesigner.ToolbarContent = TableToolbarContentDesigner;
ProTableDesigner.ToolbarActions = TableToolbarActionsDesigner;
ProTableDesigner.BatchActions = TableBatchActionsDesigner;
ProTableDesigner.Table = TableDesigner;
ProTableDesigner.Index = IndexDesigner;
//ProTableDesigner.Column = ColumnDesigner;

ProTableDesigner.Behavior = createBehavior(
  {
    name: 'ProTable',
    extends: [],
    selector: (node) => node.props['x-component'] === 'ProTable',
    designerProps: {
      droppable: false,
      propsSchema: createFieldSchema(ProTableSchema, { hasDataBindSource: true }),
    },
    designerLocales: ProTableLocales,
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
      propsSchema: createFieldSchema(ProTableSchema.QueryForm),
    },
    designerLocales: _.merge(JSON.parse(JSON.stringify(FormGridLocales)), ProTableLocales.QueryForm),
  },
  {
    name: 'ProTable.Toolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.Toolbar',
    designerProps: {
      droppable: false,
      deletable: false,
      cloneable: false,
      draggable: false,
      propsSchema: createFieldSchema(ProTableSchema.TableToolbar, { actions: ["onNew"] }),
    },
    designerLocales: ProTableLocales.TableToolbar,
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
      propsSchema: createFieldSchema(ProTableSchema.TableBatchActions),
    },
    designerLocales: ProTableLocales.TableBatchActions,
  },
  {
    name: 'ProTable.ToolbarContent',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProTable.ToolbarContent',
    designerProps: {
      droppable: true,
      deletable: false,
      cloneable: false,
      draggable: false,
      propsSchema: createFieldSchema(ProTableSchema.TableToolbarContent),
    },
    designerLocales: ProTableLocales.TableToolbarContent,
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
      propsSchema: createFieldSchema(ProTableSchema.TableToolbarActions),
    },
    designerLocales: ProTableLocales.TableToolbarActions,
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
      propsSchema: createFieldSchema(DataTableSchema),
    },
    designerLocales: DataTableLocales,
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
      propsSchema: createFieldSchema(DataTableSchema.Column, { fieldSourceType: FieldsType.Single, hasPropTitle: true }),
    },
    designerLocales: DataTableColumnLocales,
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
      propsSchema: createFieldSchema(DataTableSchema.ColumnGroup, { fieldSourceType: FieldsType.Single, hasPropTitle: true }),
    },
    designerLocales: DataTableColumnGroupLocales,
  },
)

ProTableDesigner.Resource = createResource({
  icon: 'DataQueryListSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProTable',
        'x-component-props': {
          hasQueryForm: true,
          hasToolbar: true,
          hasBatchActions: true,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'object',
            'x-component': 'ProTable.QueryForm',
            'x-component-props': {
              collapsiable: true,
              colon: true,
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'object',
            'x-component': 'ProTable.Toolbar',
            'x-component-props': {
            },
          },
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'object',
                'x-component': 'ProTable.ToolbarContent',
                'x-component-props': {
                },
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'object',
                'x-component': 'ProTable.ToolbarActions',
                'x-component-props': {
                },
              },
            },
          ]
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.BatchActions',
            'x-component-props': {
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-component': 'ProTable.Table',
            'x-component-props': {
            },
          }
        },
      ]
    },
  ],
})
