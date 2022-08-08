import React, { useState } from 'react'
import { Tabs } from 'antd'
import { createBehavior, createResource, TreeNode } from '@designable/core'
import { DnFC, TreeNodeWidget, useTreeNode } from '@designable/react'
import { findNodeByComponentPath, queryNodesByComponentPath } from './shared'
import { Locales } from './locales'
import { Schema } from './schema'
import HeaderActions from './HeaderActions'
import HeaderContent from './HeaderContent'
import Content from './Content'
import TabPanel from './TabPanel'
import { useRemoveNode } from './hooks/useRemoveNode'
import FooterToolbar from './FooterToolbar'
import { observer } from '@formily/reactive-react'
import './index.less'
import { routesPlaceholder } from '../formily'
import { IHeaderActionsProps } from '../formily/PageHeaderActions'
import { IPageHeaderContentProps } from '../formily/PageHeaderContent'
import { IPageContentProps } from '../formily/PageContent'
import { IPageTabPanelProps } from '../formily/PageTabPanel'
import { IPageFooterToolbarProps } from '../formily/PageFooterToolbar'
import { PageContainer } from '../formily/PageContainer'
import { PageHeader } from '../formily/PageHeader'
import { PageBody } from '../formily/PageBody'
import { LoadTemplate } from "@designable/formily-antd/lib/common/LoadTemplate"
import { createVoidFieldSchema } from "../../Field/shared"
import { IPageContainerProps } from '../formily/IPageContainerProps'

const { TabPane } = Tabs;

export const PageContainerDesigner: DnFC<IPageContainerProps> & {
  HeaderActions?: React.FC<IHeaderActionsProps>,
  HeaderContent?: React.FC<IPageHeaderContentProps>,
  Content?: React.FC<IPageContentProps>,
  TabPanel?: React.FC<IPageTabPanelProps>,
  FooterToolbar?: React.FC<IPageFooterToolbarProps>,
} = observer((props) => {
  const {
    children,
    title,
    subtitle,
    hasBreadcrumb,
    hasGobackButton,
    hasActions,
    hasHeaderContent,
    hasHeaderContentExtra,
    hasTabs,
    hasFooterToolbar,
    ...other
  } = props;
  const [selectedTabKey, setSelectedTabKey] = useState("1")
  const node = useTreeNode()
  const handleRemoveNode = (target: TreeNode) => {
    if (target.parent?.id === node.id && target?.props?.['x-component'] === 'PageContainer.TabPanel') {
      const length = queryNodesByComponentPath(node, [
        'PageContainer',
        'PageContainer.TabPanel',
      ]).length
      setSelectedTabKey("1")
      if (!length || length <= 1) {
        const content = new TreeNode({
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.Content',
            'x-component-props': {
              title: `Title`,
            },
          },
        })
        node.append(content)
      }
    }
  }

  useRemoveNode('PageContainer', (target) => {
    if (target && Array.isArray(target)) {
      for (const child of target) {
        handleRemoveNode(child)
      }
    } else if (target) {
      handleRemoveNode(target as any)
    }
  })

  const headerActions = findNodeByComponentPath(node, [
    'PageContainer',
    'PageContainer.HeaderActions',
  ])

  const headerContent = findNodeByComponentPath(node, [
    'PageContainer',
    'PageContainer.HeaderContent',
  ])

  const footer = findNodeByComponentPath(node, [
    'PageContainer',
    'PageContainer.FooterToolbar',
  ])

  const tabs = queryNodesByComponentPath(node, [
    'PageContainer',
    'PageContainer.TabPanel',
  ])

  const otherChildrenNodes = node.children?.filter(child =>
    child.id !== headerActions?.id &&
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
      <PageHeader
        onBack={hasGobackButton ? () => window.history.back() : undefined}
        title={title}
        subTitle={subtitle}
        extra={headerActions && <TreeNodeWidget node={headerActions} />}
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
        <LoadTemplate
          actions={[
            {
              title: node.getMessage('addPanel'),
              icon: "AddPanel",
              onClick: () => {
                const content = findNodeByComponentPath(node, [
                  'PageContainer',
                  'PageContainer.Content',
                ])

                content?.remove()
                const tabPanel = new TreeNode({
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    'x-component': 'PageContainer.TabPanel',
                    'x-component-props': {
                      title: `Unnamed title`,
                    },
                  },
                })
                node.append(tabPanel)
                const tabs = queryNodesByComponentPath(node, [
                  'PageContainer',
                  'PageContainer.TabPanel',
                ])
                setSelectedTabKey(tabs.length + "")
              },
            },
          ]}
        />
        <div style={{ flex: 1 }}></div>
        <TreeNodeWidget node={footer} />
      </PageBody>
    </PageContainer>
  )
})

PageContainerDesigner.HeaderActions = HeaderActions
PageContainerDesigner.HeaderContent = HeaderContent
PageContainerDesigner.Content = Content
PageContainerDesigner.TabPanel = TabPanel
PageContainerDesigner.FooterToolbar = FooterToolbar

PageContainerDesigner.Behavior = createBehavior(
  {
    name: 'PageContainer',
    extends: [],
    selector: (node) => node.props['x-component'] === 'PageContainer',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema),
    },
    designerLocales: Locales,
  },
  {
    name: 'PageContainer.HeaderActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderActions',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createVoidFieldSchema(Schema.HeaderActions),
    },
    designerLocales: Locales.HeaderActions,
  },
  {
    name: 'PageContainer.HeaderContent',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderContent',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createVoidFieldSchema(Schema.HeaderContent),
    },
    designerLocales: Locales.HeaderContent,
  },
  {
    name: 'PageContainer.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.Content',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.Content),
    },
    designerLocales: Locales.Content,
  },
  {
    name: 'PageContainer.TabPanel',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.TabPanel',
    designerProps: {
      droppable: true,
      propsSchema: createVoidFieldSchema(Schema.TabPanel),
    },
    designerLocales: Locales.TabPanel,
  },
  {
    name: 'PageContainer.FooterToolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.FooterToolbar',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createVoidFieldSchema(Schema.FooterToolbar),
    },
    designerLocales: Locales.FooterToolbar,
  }
)

PageContainerDesigner.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'PageContainer',
        'x-component-props': {
          title: "Page title",
          subtitle: "PageContainer subtitle",
          hasBreadcrumb: false,
          hasGobackButton: false,
          hasActions: false,
          hasHeaderContent: false,
          hasHeaderContentExtra: false,
          hasTabs: false,
          hasFooterToolbar: false,
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.HeaderActions',
            'x-component-props': {
            },

          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.HeaderContent',
            'x-component-props': {
            },

          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.Content',
            'x-component-props': {
            },

          },
        }
      ]
    },
  ],
})
