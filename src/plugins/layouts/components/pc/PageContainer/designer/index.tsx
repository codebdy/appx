import React, { useCallback, useMemo, useState } from 'react'
import { Row, Tabs } from 'antd'
import { TreeNode } from '@designable/core'
import { DnFC, TreeNodeWidget, useTreeNode } from '@designable/react'
import { HeaderActionsDesigner } from './HeaderActionsDesigner'
import { HeaderContentDesigner } from './HeaderContentDesigner'
import { TabPanelDesigner } from './PageTabPanelDesigner'
import { FooterToolbarDesigner } from './FooterToolbarDesigner'
import { observer } from '@formily/reactive-react'
import './style.less'
import { LoadTemplate } from "@designable/formily-antd/lib/common/LoadTemplate"
import { HeaderContentExtraDesigner } from './HeaderContentExtraDesigner'
import { IPageContainerProps } from '../view/IPageContainerProps'
import { IHeaderActionsProps } from '../view/PageHeaderActions'
import { IPageHeaderContentProps } from '../view/PageHeaderContent'
import { IPageHeaderContentExtraProps } from '../view/PageHeaderContentExtra'
import { IPageTabPanelProps } from '../view/PageTabPanel'
import { IPageFooterToolbarProps } from '../view/PageFooterToolbar'
import { useFindNode, queryNodesByComponentPath, useRemoveNode } from '../../../../../../plugin-sdk'
import { PageContainerShell } from '../view/PageContainerShell'
import { PageHeader } from '../view/PageHeader'
import { PageBody } from '../view/PageBody'

const { TabPane } = Tabs;
export const routesPlaceholder = [
  {
    path: '$path1',
    breadcrumbName: 'Path1',
  },
  {
    path: '$path2',
    breadcrumbName: 'Path2',
  }
];

const ComponentDesigner: DnFC<IPageContainerProps> & {
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
  }, [node]);

  const selectedKey = useMemo(() => {
    return (tabs.find(tab => tab.id === selectedTabKey) ? selectedTabKey : undefined) || tabs?.[0]?.id
  }, [selectedTabKey, tabs])

  const selectedTab = useMemo(
    () => {
      return tabs?.find(tab => tab.id === selectedKey)
    },
    [selectedKey, tabs]
  )

  const handleRemoveNode = useCallback((target: TreeNode) => {
    if (target.parent?.id === node.id && target?.props?.['x-component'] === 'PageContainer.TabPanel') {
      setSelectedTabKey(tabs?.[0]?.id)
    }
  }, [node.id, tabs])

  useRemoveNode('PageContainer', (target) => {
    if (target && Array.isArray(target)) {
      for (const child of target) {
        handleRemoveNode(child)
      }
    } else if (target) {
      handleRemoveNode(target as any)
    }
  })

  return (
    <PageContainerShell {...other} >
      <PageHeader
        onBack={hasGobackButton ? () => { } : undefined}
        title={title}
        subTitle={subtitle}
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
            {hasHeaderContentExtra && headerContentExtra && <TreeNodeWidget node={headerContentExtra} />}
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

ComponentDesigner.HeaderActions = HeaderActionsDesigner
ComponentDesigner.HeaderContent = HeaderContentDesigner
ComponentDesigner.HeaderContentExtra = HeaderContentExtraDesigner
ComponentDesigner.TabPanel = TabPanelDesigner
ComponentDesigner.FooterToolbar = FooterToolbarDesigner

export default ComponentDesigner;