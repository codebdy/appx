import React from 'react'
import { Table, TableProps } from 'antd'
import { TreeNode } from '@designable/core'
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
import {
  createEnsureTypeItemsNode,
  findNodeByComponentPath,
  hasNodeByComponentPath,
  queryNodesByComponentPath
} from '../../../../common/shared'
import { useDropTemplate } from "@designable/formily-antd/lib/hooks/useDropTemplate"
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'

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

export const TableDesigner: DnFC<TableProps<any>> = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  useDropTemplate('ProTable', (source) => {
    const indexNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProTable.Column',
        'x-component-props': {
          title: `No.`,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.Index',
          },
        },
      ],
    })
    const columnNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'ProTable.Column',
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
        'x-component': 'ProTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.Remove',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.MoveDown',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'ProTable.MoveUp',
          },
        },
      ],
    })
    const objectNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'object',
      },
      children: [indexNode, columnNode, operationNode],
    })
    return [objectNode]
  })
  const columns = queryNodesByComponentPath(node, [
    'ProTable.Table',
    '*',
    'ProTable.Column',
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
      </ArrayBase>
    )
  }

  useDropTemplate('ProTable.Column', (source) => {
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
            title: node.getMessage('addIndex'),
            icon: 'AddIndex',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'ProTable.Table',
                  '*',
                  'ProTable.Column',
                  'ProTable.Index',
                ])
              )
                return
              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.Column',
                  'x-component-props': {
                    title: `No.`,
                  },
                },
                children: [
                  {
                    componentName: 'Field',
                    props: {
                      type: 'void',
                      'x-component': 'ProTable.Index',
                    },
                  },
                ],
              })
              ensureObjectItemsNode(node).prepend(tableColumn)
            },
          },
          {
            title: node.getMessage('addColumnGroup'),
            icon: 'AddColumnGroup',
            onClick: () => {
              const operationNode = findNodeByComponentPath(node, [
                'ProTable.Table',
                '*',
                'ProTable.Column',
                (name) => {
                  return (
                    name === 'ProTable.Remove' ||
                    name === 'ProTable.MoveDown' ||
                    name === 'ProTable.MoveUp'
                  )
                },
              ])

              const tableColumnGroup = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.ColumnGroup',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              if (operationNode) {
                operationNode.parent.insertBefore(tableColumnGroup)
              } else {
                ensureObjectItemsNode(node).append(tableColumnGroup)
              }
            },
          },
          {
            title: node.getMessage('addColumn'),
            icon: 'AddColumn',
            onClick: () => {
              const operationNode = findNodeByComponentPath(node, [
                'ProTable.Table',
                '*',
                'ProTable.Column',
                (name) => {
                  return (
                    name === 'ProTable.Remove' ||
                    name === 'ProTable.MoveDown' ||
                    name === 'ProTable.MoveUp'
                  )
                },
              ])

              const tableColumn = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'ProTable.Column',
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
                'ProTable',
                '*',
                'ProTable.Column',
                (name) => {
                  return (
                    name === 'ProTable.Remove' ||
                    name === 'ProTable.MoveDown' ||
                    name === 'ProTable.MoveUp'
                  )
                },
              ])

              if (!oldOperationNode) {
                const operationNode = new TreeNode({
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    'x-component': 'ProTable.Column',
                    'x-component-props': {
                      title: `Title`,
                    },
                  },
                  children: [
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'ProTable.Remove',
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'ProTable.MoveDown',
                      },
                    },
                    {
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'ProTable.MoveUp',
                      },
                    },
                  ],
                })
                ensureObjectItemsNode(node).append(operationNode)
              }
            },
          },
        ]}
      />
    </div>
  )
})

//ArrayBase.mixin(TableDesigner)

// TableDesigner.Behavior = createBehavior(
//   {
//     name: 'ProTable.Table',
//     extends: ['Field'],
//     selector: (node) => node.props['x-component'] === 'ProTable.Table',
//     designerProps: {
//       droppable: true,
//       deletable: false,
//       cloneable: false,
//       draggable: false,
//       propsSchema: createFieldSchema(TableSchema),
//     },
//     designerLocales: TableColumnLocales,
//   },
//   {
//     name: 'ProTable.Column',
//     extends: ['Field'],
//     selector: (node) => node.props['x-component'] === 'ProTable.Column',
//     designerProps: {
//       droppable: true,
//       allowDrop: (node) =>
//         node.props['type'] === 'object' &&
//         node.parent?.props?.['x-component'] === 'ProTable.Column',
//       propsSchema: createFieldSchema(TableSchema.Column),
//     },
//     designerLocales: TableColumnLocales,
//   },
// )

