import React from 'react'
import { Table, TableProps } from 'antd'
import { TreeNode, createBehavior } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@designable/react'
import { ArrayBase } from '@formily/antd'
import { observer } from '@formily/react'
import cls from 'classnames'
import { createEnsureTypeItemsNode, findNodeByComponentPath, hasNodeByComponentPath, queryNodesByComponentPath } from '../../../../../components/common/shared'
import { useDropTemplate } from "@designable/formily-antd/lib/hooks/useDropTemplate"
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { DataTableSchema } from './schema'
import { DataTableColumnLocales, DataTableLocales } from './locales'
import { createFieldSchema } from "../../../../common/Field";

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const HeaderCell: React.FC = (props: any) => {
  return (
    <th
      {...props}
      data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      {props.children}
    </th>
  )
}

const BodyCell: React.FC = (props: any) => {
  return (
    <td
      {...props}
      data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      {props.children}
    </td>
  )
}

export const DataTableDesigner: DnFC<TableProps<any>> = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  useDropTemplate('DataTable', (source) => {
    const sortHandleNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'DataTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'DataTable.SortHandle',
          },
        },
      ],
    })
    const indexNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'DataTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'DataTable.Index',
          },
        },
      ],
    })
    const columnNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'DataTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: source.map((node) => {
        node.props.title = undefined
        return node
      }),
    })

    const operationNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'DataTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'DataTable.Remove',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'DataTable.MoveDown',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'DataTable.MoveUp',
          },
        },
      ],
    })
    const objectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'object',
      },
      children: [sortHandleNode, indexNode, columnNode, operationNode],
    })
    const additionNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        title: 'Addition',
        'x-component': 'DataTable.Addition',
      },
    })
    return [objectNode, additionNode]
  })
  const columns = queryNodesByComponentPath(node, [
    'DataTable',
    '*',
    'DataTable.Column',
  ])
  const additions = queryNodesByComponentPath(node, [
    'DataTable',
    'DataTable.Addition',
  ])
  const defaultRowKey = () => {
    return node.id
  }

  const renderTable = () => {
    if (node.children.length === 0) return <DroppableWidget />
    return (
      <ArrayBase disabled>
        <Table
          size="small"
          bordered
          {...props}
          scroll={{ x: '100%' }}
          className={cls('ant-formily-array-table', props.className)}
          style={{ marginBottom: 10, ...props.style }}
          rowKey={defaultRowKey}
          dataSource={[{ id: '1' }]}
          pagination={false}
          components={{
            header: {
              cell: HeaderCell,
            },
            body: {
              cell: BodyCell,
            },
          }}
        >
          {columns.map((node) => {
            const children = node.children.map((child) => {
              return <TreeNodeWidget node={child} key={child.id} />
            })
            const props = node.props['x-component-props']
            return (
              <Table.Column
                {...props}
                title={
                  <div data-content-editable="x-component-props.title">
                    {props.title}
                  </div>
                }
                dataIndex={node.id}
                className={`data-id:${node.id}`}
                key={node.id}
                render={(value, record, key) => {
                  return (
                    <ArrayBase.Item key={key} index={key} record={null}>
                      {children.length > 0 ? children : 'Droppable'}
                    </ArrayBase.Item>
                  )
                }}
              />
            )
          })}
          {columns.length === 0 && (
            <Table.Column render={() => <DroppableWidget />} />
          )}
        </Table>
        {additions.map((child) => {
          return <TreeNodeWidget node={child} key={child.id} />
        })}
      </ArrayBase>
    )
  }

  useDropTemplate('DataTable.Column', (source) => {
    return source.map((node) => {
      node.props.title = undefined
      return node
    })
  })

  return (
    <div {...nodeId} className="dn-array-table">
      {renderTable()}
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addSortHandle'),
            icon: 'AddSort',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'DataTable',
                  '*',
                  'DataTable.Column',
                  'DataTable.SortHandle',
                ])
              )
                return
              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'DataTable.Column',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
                children: [
                  {
                    componentName: 'Field',
                    props: {
                      type: 'void',
                      'x-component': 'DataTable.SortHandle',
                    },
                  },
                ],
              })
              ensureObjectItemsNode(node).prepend(tableColumn)
            },
          },
          {
            title: node.getMessage('addIndex'),
            icon: 'AddIndex',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'DataTable',
                  '*',
                  'DataTable.Column',
                  'DataTable.Index',
                ])
              )
                return
              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'DataTable.Column',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
                children: [
                  {
                    componentName: 'Field',
                    props: {
                      type: 'void',
                      'x-component': 'DataTable.Index',
                    },
                  },
                ],
              })
              const sortNode = findNodeByComponentPath(node, [
                'DataTable',
                '*',
                'DataTable.Column',
                'DataTable.SortHandle',
              ])
              if (sortNode) {
                sortNode.parent.insertAfter(tableColumn)
              } else {
                ensureObjectItemsNode(node).prepend(tableColumn)
              }
            },
          },
          {
            title: node.getMessage('addColumn'),
            icon: 'AddColumn',
            onClick: () => {
              const operationNode = findNodeByComponentPath(node, [
                'DataTable',
                '*',
                'DataTable.Column',
                (name) => {
                  return (
                    name === 'DataTable.Remove' ||
                    name === 'DataTable.MoveDown' ||
                    name === 'DataTable.MoveUp'
                  )
                },
              ])
              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'DataTable.Column',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              if (operationNode) {
                operationNode.parent.insertBefore(tableColumn)
              } else {
                ensureObjectItemsNode(node).append(tableColumn)
              }
            },
          },
          {
            title: node.getMessage('addOperation'),
            icon: 'AddOperation',
            onClick: () => {
              const oldOperationNode = findNodeByComponentPath(node, [
                'DataTable',
                '*',
                'DataTable.Column',
                (name) => {
                  return (
                    name === 'DataTable.Remove' ||
                    name === 'DataTable.MoveDown' ||
                    name === 'DataTable.MoveUp'
                  )
                },
              ])
              const oldAdditionNode = findNodeByComponentPath(node, [
                'DataTable',
                'DataTable.Addition',
              ])
              if (!oldOperationNode) {
                const operationNode = new TreeNode({
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    'x-component': 'DataTable.Column',
                    'x-component-props': {
                      title: `Title`,
                    },
                  },
                  children: [
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'DataTable.Remove',
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'DataTable.MoveDown',
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'DataTable.MoveUp',
                      },
                    },
                  ],
                })
                ensureObjectItemsNode(node).append(operationNode)
              }
              if (!oldAdditionNode) {
                const additionNode = new TreeNode({
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    title: 'Addition',
                    'x-component': 'DataTable.Addition',
                  },
                })
                ensureObjectItemsNode(node).insertAfter(additionNode)
              }
            },
          },
        ]}
      />
    </div>
  )
})

//ArrayBase.mixin(DataTableDesigner)

DataTableDesigner.Behavior = createBehavior(
  {
    name: 'DataTable',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DataTable',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(DataTableSchema),
    },
    designerLocales: DataTableLocales,
  },
  {
    name: 'DataTable.Column',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DataTable.Column',
    designerProps: {
      droppable: true,
      allowDrop: (node) =>
        node.props['type'] === 'object' &&
        node.parent?.props?.['x-component'] === 'DataTable.Column',
      propsSchema: createFieldSchema(DataTableSchema.Column),
    },
    designerLocales: DataTableColumnLocales,
  },
)

