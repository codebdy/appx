import React, { useCallback, useMemo, useState } from 'react'
import { Row, Tabs } from 'antd'
import { createBehavior, createResource, TreeNode } from '@designable/core'
import { DnFC, TreeNodeWidget, useTreeNode } from '@designable/react'
import { queryNodesByComponentPath } from './shared'
import { PageContainerLocales } from './locales'
import { PageContainerSchema } from './schema'
import HeaderActions from './HeaderActions'
import HeaderContent from './HeaderContent'
import TabPanel from './PageTabPanel'
import FooterToolbar from './FooterToolbar'
import { observer } from '@formily/reactive-react'
import './index.less'
import { LoadTemplate } from "@designable/formily-antd/lib/common/LoadTemplate"
import { createFieldSchema } from "../../common/Field/shared"
import { useFindNode } from './hooks/useFindNode'
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
  const [selectedTabKey, setSelectedTabKey] = useState<string>()
  const node = useTreeNode()
  const headerActions = useFindNode('HeaderActions');
  const headerContent = useFindNode("HeaderContent");
  const headerContentExtra = useFindNode("HeaderContentExtra");
  const footer = useFindNode('FooterToolbar');

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
    setSelectedTabKey(tabPanel.id)
  }, [node])

  const selectedKey = useMemo(() => selectedTabKey || tabs?.[0]?.id, [selectedTabKey, tabs])
  const selectedTab = useMemo(
    () => {
      return tabs?.find(tab => tab.id === selectedKey)
    },
    [selectedKey, tabs]
  )

  return (
    <PageContainerShell {...other} >
      <PageHeader
        onBack={hasGobackButton ? () => window.history.back() : undefined}
        title={<span data-content-editable="x-component-props.title">{title}</span>}
        subTitle={subtitle && <span data-content-editable="x-component-props.subtitle">{subtitle}</span>}
        extra={hasActions && headerActions && <TreeNodeWidget node={headerActions} />}
        footer={
          hasTabs && <Tabs activeKey={selectedKey} onChange={handleSelectTab}>
            {
              tabs.map((tab) => {
                return (
                  <TabPane tab={tab?.props?.['x-component-props']?.["title"]} key={tab.id} />
                )
              })
            }
          </Tabs>
        }
        breadcrumb={hasBreadcrumb ? { routes: routesPlaceholder } : undefined}
      >
        {
          (hasHeaderContent || hasHeaderContentExtra) &&
          <Row>
            {hasHeaderContent && headerContent && <TreeNodeWidget node={headerContent} />}
            {hasHeaderContentExtra && hasHeaderContentExtra && <TreeNodeWidget node={headerContentExtra} />}
          </Row>
        }
      </PageHeader>
      <PageBody>

        {
          !hasTabs && otherChildrenNodes?.map((child) => {
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
        <TreeNodeWidget node={hasFooterToolbar ? footer : undefined} />
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
      propsSchema: createFieldSchema(PageContainerSchema, { hasDataBindSource: true }),
    },
    designerLocales: PageContainerLocales,
  },
  {
    name: 'PageContainer.HeaderActions',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderActions',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(PageContainerSchema.HeaderActions),
    },
    designerLocales: PageContainerLocales.HeaderActions,
  },
  {
    name: 'PageContainer.HeaderContent',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderContent',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(PageContainerSchema.HeaderContent),
    },
    designerLocales: PageContainerLocales.HeaderContent,
  },
  {
    name: 'PageContainer.HeaderContentExtra',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.HeaderContentExtra',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(PageContainerSchema.HeaderContentExtra),
    },
    designerLocales: PageContainerLocales.HeaderContentExtra,
  },
  {
    name: 'PageContainer.TabPanel',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.TabPanel',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(PageContainerSchema.TabPanel),
    },
    designerLocales: PageContainerLocales.TabPanel,
  },
  {
    name: 'PageContainer.FooterToolbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PageContainer.FooterToolbar',
    designerProps: {
      droppable: true,
      deletable: false,
      propsSchema: createFieldSchema(PageContainerSchema.FooterToolbar),
    },
    designerLocales: PageContainerLocales.FooterToolbar,
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
              gridSpan: 18
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.HeaderContentExtra',
            'x-component-props': {
              gridSpan: 6
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.TabPanel',
            'x-component-props': {
              title: `Unnamed title`,
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer.FooterToolbar',
            'x-component-props': {
            },
          },
        },
      ]
    },
  ],
})
