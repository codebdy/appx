import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Row, Tabs } from 'antd'
import { createBehavior, createResource, TreeNode } from '@designable/core'
import { DnFC, TreeNodeWidget, useTreeNode } from '@designable/react'
import { queryNodesByComponentPath } from './shared'
import { Locales } from './locales'
import { Schema } from './schema'
import HeaderActions from './HeaderActions'
import HeaderContent from './HeaderContent'
import TabPanel from './PageTabPanel'
import { useRemoveNode } from './hooks/useRemoveNode'
import FooterToolbar from './FooterToolbar'
import { observer } from '@formily/reactive-react'
import './index.less'
import { LoadTemplate } from "@designable/formily-antd/lib/common/LoadTemplate"
import { createFieldSchema } from "../../common/Field/shared"
import { useTriggerableNode } from './hooks/useTriggerableNode'
import HeaderContentExtra from './HeaderContentExtra'
import { IPageContainerProps } from '../PageContainer/IPageContainerProps'
import { IHeaderActionsProps } from '../PageContainer/PageHeaderActions'
import { IPageHeaderContentProps } from '../PageContainer/PageHeaderContent'
import { IPageHeaderContentExtraProps } from '../PageContainer/PageHeaderContentExtra'
import { IPageTabPanelProps } from '../PageContainer/PageTabPanel'
import { IPageFooterToolbarProps } from '../PageContainer/PageFooterToolbar'
import { routesPlaceholder } from '../PageContainer'
import { PageHeader } from '../PageContainer/PageHeader'
import { PageBody } from '../PageContainer/PageBody'
import { PageContainerShell } from '../PageContainer/PageContainerShell'

const { TabPane } = Tabs;

export const PageContainerDesigner: DnFC<IPageContainerProps> & {
  HeaderActions?: React.FC<IHeaderActionsProps>,
  HeaderContent?: React.FC<IPageHeaderContentProps>,
  HeaderContentExtra?: React.FC<IPageHeaderContentExtraProps>,
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
  const handleRemoveNode = useCallback((target: TreeNode) => {
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
  }, [node])

  useRemoveNode('PageContainer', (target) => {
    if (target && Array.isArray(target)) {
      for (const child of target) {
        handleRemoveNode(child)
      }
    } else if (target) {
      handleRemoveNode(target as any)
    }
  })

  const headerActions = useTriggerableNode(hasActions, 'HeaderActions');
  const headerContent = useTriggerableNode(hasHeaderContent, "HeaderContent", { gridSpan: 18 });
  const headerContentExtra = useTriggerableNode(hasHeaderContentExtra, "HeaderContentExtra", { gridSpan: 6 });
  const footer = useTriggerableNode(hasFooterToolbar, 'FooterToolbar');

  const tabs = queryNodesByComponentPath(node, [
    'PageContainer',
    'PageContainer.TabPanel',
  ])

  const otherChildrenNodes = useMemo(() => node.children?.filter(child =>
    child.id !== headerActions?.id &&
    child.id !== headerContent?.id &&
    child.id !== headerContentExtra?.id &&
    child.id !== footer?.id &&
    !tabs?.find(tab => tab.id === child.id)
  ), [footer?.id, headerActions?.id, headerContent?.id, headerContentExtra?.id, node.children, tabs])

  const handleSelectTab = useCallback((key: string) => {
    setSelectedTabKey(key);
  }, []);

  const selectedTab = useMemo(() => tabs?.[parseInt(selectedTabKey) - 1], [selectedTabKey, tabs])

  const handleAddPannel = useCallback(() => {
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
  }, [node])


  useEffect(() => {
    if (hasTabs && !tabs.length) {
      for (const child of otherChildrenNodes) {
        child.remove()
      }
      handleAddPannel()
    } else if (!hasTabs && tabs.length) {
      for (const tab of tabs) {
        tab.remove()
      }
    }
  }, [handleAddPannel, hasTabs, otherChildrenNodes, tabs, tabs.length])

  return (
    <PageContainerShell {...other} >
      <PageHeader
        onBack={hasGobackButton ? () => window.history.back() : undefined}
        title={<span data-content-editable="x-component-props.title">{title}</span>}
        subTitle={subtitle && <span data-content-editable="x-component-props.subtitle">{subtitle}</span>}
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
        {
          (headerContent || headerContentExtra) &&
          <Row>
            {headerContent && <TreeNodeWidget node={headerContent} />}
            {hasHeaderContentExtra && <TreeNodeWidget node={headerContentExtra} />}
          </Row>
        }
      </PageHeader>
      <PageBody>

        {
          otherChildrenNodes?.map((child) => {
            return (
              child && <TreeNodeWidget node={child} />
            )
          })
        }
        {
          hasTabs &&
          <>
            <TreeNodeWidget node={selectedTab} />
            <LoadTemplate
              actions={[
                {
                  title: node.getMessage('addPanel'),
                  icon: "AddPanel",
                  onClick: handleAddPannel,
                },
              ]}
            />
          </>
        }

        <div style={{ flex: 1 }}></div>
        <TreeNodeWidget node={footer} />
      </PageBody>
    </PageContainerShell>
  )
})

PageContainerDesigner.HeaderActions = HeaderActions
PageContainerDesigner.HeaderContent = HeaderContent
PageContainerDesigner.HeaderContentExtra = HeaderContentExtra
PageContainerDesigner.TabPanel = TabPanel
PageContainerDesigner.FooterToolbar = FooterToolbar

PageContainerDesigner.Behavior = createBehavior(
  {
    name: 'PageContainer',
    extends: [],
    selector: (node) => node.props['x-component'] === 'PageContainer',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(Schema, { hasDataBindSource: true }),
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
      propsSchema: createFieldSchema(Schema.HeaderActions),
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
      propsSchema: createFieldSchema(Schema.HeaderContent),
    },
    designerLocales: Locales.HeaderContent,
  },
  {
    name: 'PageContainer.HeaderContentExtra',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderContentExtra',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(Schema.HeaderContentExtra),
    },
    designerLocales: Locales.HeaderContentExtra,
  },
  {
    name: 'PageContainer.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.Content',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(Schema.Content),
    },
    designerLocales: Locales.Content,
  },

  {
    name: 'PageContainer.TabPanel',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.TabPanel',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(Schema.TabPanel),
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
      propsSchema: createFieldSchema(Schema.FooterToolbar),
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
          //subtitle: "PageContainer subtitle",
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
            'x-component': 'PageContainer.Content',
            'x-component-props': {
            },
          },
        }
      ]
    },
  ],
})
