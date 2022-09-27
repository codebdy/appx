import { observer } from "@formily/reactive-react"
import { Card, TableProps } from "antd"
import React from "react"
import { DnFC, TreeNodeWidget } from '@designable/react'
import { QueryFormDesigner } from "./QueryFormDesigner"
import { createBehavior, createResource } from '@designable/core'
import clx from "classnames"
import _ from "lodash"
import { TableToolbarDesigner } from "./TableToolbarDesigner"
import { TableBatchActionsDesigner } from "./TableBatchActionsDesigner"
import { DataTableColumnGroupLocales, DataTableColumnLocales, DataTableLocales } from "./TableDesigner/locales"
import { DataTableSchema } from "./TableDesigner/schema"
import { TableDesigner } from "./TableDesigner"
import { IndexDesigner } from "./TableDesigner/IndexDesigner"
import { TableToolbarActionsDesigner } from "./TableToolbarActionsDesigner"
import { IProTableProps } from "../view"
import { IQueryFormProps } from "../view/QueryForm"
import { ITableToolbarProps } from "../view/TableToolbar"
import { ITableToolbarActionsProps } from "../view/TableToolbarActions"
import { ITableBatchActionsProps } from "../view/TableBatchActions"
import { useFindNode } from "../../../../../../plugin-sdk"
import { ProTableContext } from "../view/context"

export const ProTableDesigner: DnFC<IProTableProps> & {
  QueryForm?: React.FC<IQueryFormProps>,
  Toolbar?: React.FC<ITableToolbarProps>,
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
ProTableDesigner.ToolbarActions = TableToolbarActionsDesigner;
ProTableDesigner.BatchActions = TableBatchActionsDesigner;
ProTableDesigner.Table = TableDesigner;
ProTableDesigner.Index = IndexDesigner;
//ProTableDesigner.Column = ColumnDesigner;


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
          selectable: true,
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
                type: 'void',
                'x-component': 'ProTable.ToolbarActions',
                'x-component-props': {
                },
              },
              children: [
                {
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    'x-component': 'Button',
                    'x-component-props': {
                      title: "New",
                      "type": "primary",
                      "icon": {
                        "iconKey": "PlusOutlined"
                      }
                    },
                  },
                }
              ]
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'Text',
                'x-component-props': {
                  content: "Title",
                },
              },
            }
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
