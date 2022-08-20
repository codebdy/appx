import { Tabs } from "antd";
import React, { useState } from "react"
import { RecursionField, useFieldSchema } from '@formily/react';
import "./index.less"
import clx from "classnames"
import { PageHeader } from "./PageHeader";
import { PageBody } from "./PageBody";
import PageHeaderActions, { IHeaderActionsProps } from "./PageHeaderActions";
import PageHeaderContent, { IPageHeaderContentProps } from "./PageHeaderContent";
import PageTabPanel, { IPageTabPanelProps } from "./PageTabPanel";
import PageFooterToolbar, { IPageFooterToolbarProps } from "./PageFooterToolbar";
import { IPageContainerProps } from "./IPageContainerProps";
import { PageContainerShell } from "./PageContainerShell";

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

export const PageContainer: React.FC<IPageContainerProps> & {
  HeaderActions?: React.FC<IHeaderActionsProps>,
  HeaderContent?: React.FC<IPageHeaderContentProps>,
  TabPanel?: React.FC<IPageTabPanelProps>,
  FooterToolbar?: React.FC<IPageFooterToolbarProps>,
} = (props: IPageContainerProps) => {
  const { hasGobackButton, title, subtitle, hasBreadcrumb, className } = props
  const [selectedTabKey, setSelectedTabKey] = useState("1")
  const fieldSchema = useFieldSchema()
  const slots = {
    headerExtra: null,
    headerContent: null,
    footer: null,
    tabs: [],
    otherChildren: []
  }

  for (const key of Object.keys(fieldSchema?.properties || {})) {
    const childSchema = fieldSchema.properties[key]
    if (childSchema["x-component"] === 'Page.HeaderActions') {
      slots.headerExtra = childSchema
    } else if (childSchema["x-component"] === 'Page.HeaderContent') {
      slots.headerContent = childSchema
    } else if (childSchema["x-component"] === 'Page.FooterToolbar') {
      slots.footer = childSchema
    } else if (childSchema["x-component"] === 'Page.TabPanel') {
      slots.tabs.push(childSchema)
    } else {
      slots.otherChildren.push(childSchema)
    }
  }

  const handleSelectTab = (key: string) => {
    setSelectedTabKey(key);
  };

  const selectedTab = slots.tabs?.[parseInt(selectedTabKey) - 1]

  return (
    <PageContainerShell>
      <PageHeader
        className={clx(className, "rx-page-header-responsive")}
        onBack={hasGobackButton ? () => window.history.back() : undefined}
        title={title}
        subTitle={subtitle}
        extra={slots.headerExtra && <RecursionField schema={slots.headerExtra} name={slots.headerExtra.name} />}
        footer={
          slots.tabs && <Tabs activeKey={selectedTabKey} onChange={handleSelectTab}>
            {
              slots.tabs.map((tab, index) => {
                return (
                  <TabPane tab={tab['x-component-props']?.["title"]} key={index + 1} />
                )
              })
            }

          </Tabs>
        }
        breadcrumb={hasBreadcrumb ? { routes: routesPlaceholder } : undefined}
      >
        {slots.headerContent && <RecursionField schema={slots.headerContent} name={slots.headerContent.name} />}
      </PageHeader>
      <PageBody>
        {selectedTab && <RecursionField schema={selectedTab} name={selectedTab.name} />}
        {
          slots.otherChildren?.map((child, index) => {
            return (
              <div key={index}>
                <RecursionField key={index} schema={child} name={child.name} />
              </div>
            )
          })
        }
        {slots.footer && <RecursionField schema={slots.footer} name={slots.footer.name} />}
      </PageBody>
    </PageContainerShell>
  )
}

PageContainer.HeaderActions = PageHeaderActions
PageContainer.HeaderContent = PageHeaderContent
PageContainer.TabPanel = PageTabPanel
PageContainer.FooterToolbar = PageFooterToolbar