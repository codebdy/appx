import React, { useState } from 'react'
import { Tabs } from 'antd'
import { createBehavior, createResource, TreeNode } from '@designable/core'
import { DnFC, TreeNodeWidget, useTreeNode } from '@designable/react'
import { createVoidFieldSchema } from '../../components/Field'
import { createEnsureTypeItemsNode, findNodeByComponentPath, hasNodeByComponentPath, queryNodesByComponentPath } from '../../shared'
import { LoadTemplate } from '../../common/LoadTemplate'
import { Locales } from './locales'
import { Schema } from './schema'
import HeaderExtra from './HeaderExtra'
import HeaderContent from './HeaderContent'
import { BookOutlined } from '@ant-design/icons'
import Content from './Content'
import TabPanel from './TabPanel'
import { useRemoveNode } from '../hooks/useRemoveNode'
import FooterToolbar from './FooterToolbar'
import { observer } from '@formily/reactive-react'
import './index.less'
import { IPageProps, routesPlaceholder } from '../../executable/Page'
import { PageContainer } from '../../executable/Page/PageContainer'
import { PageHeader } from '../../executable/Page/PageHeader'
import { PageBody } from '../../executable/Page/PageBody'
import { IPageHeaderExtraProps } from '../../executable/Page/PageHeaderExtra'
import { IPageHeaderContentProps } from '../../executable/Page/PageHeaderContent'
import { IPageContentProps } from '../../executable/Page/PageContent'
import { IPageTabPanelProps } from '../../executable/Page/PageTabPanel'
import { IPageFooterToolbarProps } from '../../executable/Page/PageFooterToolbar'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

const { TabPane } = Tabs;

export const Page: DnFC<IPageProps> & {
  HeaderExtra?: React.FC<IPageHeaderExtraProps>,
  HeaderContent?: React.FC<IPageHeaderContentProps>,
  Content?: React.FC<IPageContentProps>,
  TabPanel?: React.FC<IPageTabPanelProps>,
  FooterToolbar?: React.FC<IPageFooterToolbarProps>,
} = observer((props) => {
  const { children, title, subtitle, hasBreadcrumb, showGoback, ...other } = props;
  const [selectedTabKey, setSelectedTabKey] = useState("1")
  const node = useTreeNode()
  const handleRemoveNode = (target: TreeNode) => {
    if (target.parent?.id === node.id && target?.props?.['x-component'] === 'Page.TabPanel') {
      const length = queryNodesByComponentPath(node, [
        'Page',
        'Page.TabPanel',
      ]).length
      setSelectedTabKey("1")
      if (!length || length <= 1) {
        const content = new TreeNode({
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Page.Content',
            'x-component-props': {
              title: `Title`,
            },
          },
        })
        node.append(content)
      }
    }
  }

  useRemoveNode('Page', (target) => {
    if (target && Array.isArray(target)) {
      for (const child of target) {
        handleRemoveNode(child)
      }
    } else if (target) {
      handleRemoveNode(target as any)
    }
  })

  const headerExtra = findNodeByComponentPath(node, [
    'Page',
    'Page.HeaderExtra',
  ])

  const headerContent = findNodeByComponentPath(node, [
    'Page',
    'Page.HeaderContent',
  ])

  const footer = findNodeByComponentPath(node, [
    'Page',
    'Page.FooterToolbar',
  ])

  const tabs = queryNodesByComponentPath(node, [
    'Page',
    'Page.TabPanel',
  ])

  const otherChildrenNodes = node.children?.filter(child =>
    child.id !== headerExtra?.id &&
    child.id !== headerContent?.id &&
    child.id !== footer?.id &&
    !tabs?.find(tab => tab.id === child.id)
  )

  const handleSelectTab = (key: string) => {
    setSelectedTabKey(key);
  };

  const selectedTab = tabs?.[parseInt(selectedTabKey) - 1]

  return (
    <PageContainer {...other} >
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addExtra'),
            icon: 'AddOperation',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'Page',
                  'Page.HeaderExtra',
                ])
              )
                return
              const extra = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Page.HeaderExtra',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              node.append(extra)
            },
          },
          {
            title: node.getMessage('addHeaderContent'),
            icon: <BookOutlined />,
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'Page',
                  'Page.HeaderContent',
                ])
              ) {
                return
              }

              const headerContent = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Page.HeaderContent',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              node.append(headerContent)
            },
          },
          {
            title: node.getMessage('addPanel'),
            icon: "AddPanel",
            onClick: () => {
              const content = findNodeByComponentPath(node, [
                'Page',
                'Page.Content',
              ])

              content?.remove()
              const tabPanel = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Page.TabPanel',
                  'x-component-props': {
                    title: `Unnamed title`,
                  },
                },
              })
              node.append(tabPanel)
              const tabs = queryNodesByComponentPath(node, [
                'Page',
                'Page.TabPanel',
              ])
              setSelectedTabKey(tabs.length + "")
            },
          },
          {
            title: node.getMessage('addFooter'),
            icon: "AddPanel",
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'Page',
                  'Page.FooterToolbar',
                ])
              ) {
                return
              }

              const footer = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Page.FooterToolbar',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              node.append(footer)
            },
          },
        ]}
      />
      <PageHeader
        onBack={showGoback ? () => window.history.back() : undefined}
        title={title}
        subTitle={subtitle}
        extra={headerExtra && <TreeNodeWidget node={headerExtra} />}
        footer={
          <Tabs activeKey={selectedTabKey} onChange={handleSelectTab}>
            {
              tabs.map((tab, index) => {
                return (
                  <TabPane tab={tab?.props?.['x-component-props']?.["title"]} key={index + 1} />
                )
              })
            }

          </Tabs>
        }
        breadcrumb={hasBreadcrumb ? { routes: routesPlaceholder } : undefined}
      >
        {headerContent && <TreeNodeWidget node={headerContent} />}
      </PageHeader>
      <PageBody>
        <TreeNodeWidget node={selectedTab} />
        {
          otherChildrenNodes?.map((child) => {
            return (
              child && <TreeNodeWidget node={child} />
            )
          })
        }
        <div style={{ flex: 1 }}></div>
        <TreeNodeWidget node={footer} />
      </PageBody>
    </PageContainer>
  )
})

Page.HeaderExtra = HeaderExtra
Page.HeaderContent = HeaderContent
Page.Content = Content
Page.TabPanel = TabPanel
Page.FooterToolbar = FooterToolbar

Page.Behavior = createBehavior(
  {
    name: 'Page',
    extends: [],
    selector: (node) => node.props['x-component'] === 'Page',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema),
    },
    designerLocales: Locales,
  },
  {
    name: 'Page.HeaderExtra',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Page.HeaderExtra',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.HeaderExtra),
    },
    designerLocales: Locales.HeaderExtra,
  },
  {
    name: 'Page.HeaderContent',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Page.HeaderContent',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.HeaderContent),
    },
    designerLocales: Locales.HeaderContent,
  },
  {
    name: 'Page.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Page.Content',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.Content),
    },
    designerLocales: Locales.Content,
  },
  {
    name: 'Page.TabPanel',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Page.TabPanel',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.TabPanel),
    },
    designerLocales: Locales.TabPanel,
  },
  {
    name: 'Page.FooterToolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Page.FooterToolbar',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.FooterToolbar),
    },
    designerLocales: Locales.FooterToolbar,
  }
)

Page.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Page',
        'x-component-props': {
          title: "Page title",
          subtitle: "Page subtitle",
          hasBreadcrumb: true,
          showGoback: true,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Page.HeaderExtra',
            'x-component-props': {
              title: "ddd",
            },

          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Page.HeaderContent',
            'x-component-props': {
              title: "ddd",
            },

          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Page.Content',
            'x-component-props': {
              title: "ddd",
            },

          },
        }
      ]
    },
  ],
})
