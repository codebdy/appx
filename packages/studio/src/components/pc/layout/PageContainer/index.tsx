import { Row, Tabs } from "antd";
import React, { useState } from "react"
import { RecursionField, useFieldSchema } from '@formily/react';
import "./index.less"
import { PageHeader } from "./PageHeader";
import { PageBody } from "./PageBody";
import PageHeaderActions, { IHeaderActionsProps } from "./PageHeaderActions";
import PageHeaderContent, { IPageHeaderContentProps } from "./PageHeaderContent";
import PageTabPanel, { IPageTabPanelProps } from "./PageTabPanel";
import PageFooterToolbar, { IPageFooterToolbarProps } from "./PageFooterToolbar";
import { IPageContainerProps } from "./IPageContainerProps";
import { PageContainerShell } from "./PageContainerShell";
import { useBreadcumbItems } from "../../../../AppRunner/hooks/useBreadcumbItems";
import PageHeaderContentExtra, { IPageHeaderContentExtraProps } from "./PageHeaderContentExtra";

const { TabPane } = Tabs;

export const PageContainer: React.FC<IPageContainerProps> & {
  HeaderActions?: React.FC<IHeaderActionsProps>,
  HeaderContent?: React.FC<IPageHeaderContentProps>,
  HeaderContentExtra?: React.FC<IPageHeaderContentExtraProps>,
  TabPanel?: React.FC<IPageTabPanelProps>,
  FooterToolbar?: React.FC<IPageFooterToolbarProps>,
} = (props: IPageContainerProps) => {
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
  const fieldSchema = useFieldSchema()
  const slots = {
    headerExtra: null,
    headerContent: null,
    headerContentExtra: null,
    footer: null,
    tabs: [],
    otherChildren: []
  }

  const breadcrumbs = useBreadcumbItems();

  for (const key of Object.keys(fieldSchema?.properties || {})) {
    const childSchema = fieldSchema.properties[key]
    if (childSchema["x-component"] === 'PageContainer.HeaderActions') {
      slots.headerExtra = childSchema
    } else if (childSchema["x-component"] === 'PageContainer.HeaderContent') {
      slots.headerContent = childSchema
    } else if (childSchema["x-component"] === 'PageContainer.FooterToolbar') {
      slots.footer = childSchema
    } else if (childSchema["x-component"] === 'PageContainer.TabPanel') {
      slots.tabs.push(childSchema)
    } else if (childSchema["x-component"] === 'PageContainer.HeaderContentExtra') {
      slots.headerContentExtra = childSchema;
    } else {
      slots.otherChildren.push(childSchema)
    }
  }

  const handleSelectTab = (key: string) => {
    setSelectedTabKey(key);
  };

  const selectedTab = slots.tabs?.[parseInt(selectedTabKey) - 1]

  return (
    <PageContainerShell {...other}>
      <PageHeader
        className="rx-page-header-responsive"
        onBack={hasGobackButton ? () => window.history.back() : undefined}
        title={title}
        subTitle={subtitle}
        extra={hasActions && slots.headerExtra && <RecursionField schema={slots.headerExtra} name={slots.headerExtra.name} />}
        footer={
          hasTabs && slots.tabs && <Tabs activeKey={selectedTabKey} onChange={handleSelectTab}>
            {
              slots.tabs.map((tab, index) => {
                return (
                  <TabPane tab={tab['x-component-props']?.["title"]} key={index + 1} />
                )
              })
            }

          </Tabs>
        }
        breadcrumb={hasBreadcrumb ? { routes: breadcrumbs } : undefined}
      >
        <Row>
          {hasHeaderContent && slots.headerContent && <RecursionField schema={slots.headerContent} name={slots.headerContent.name} />}
          {hasHeaderContentExtra && slots.headerContentExtra && <RecursionField schema={slots.headerContentExtra} name={slots.headerContentExtra.name} />}
        </Row>

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
        {hasFooterToolbar && slots.footer && <RecursionField schema={slots.footer} name={slots.footer.name} />}
      </PageBody>
    </PageContainerShell>
  )
}

PageContainer.HeaderActions = PageHeaderActions
PageContainer.HeaderContent = PageHeaderContent
PageContainer.HeaderContentExtra = PageHeaderContentExtra
PageContainer.TabPanel = PageTabPanel
PageContainer.FooterToolbar = PageFooterToolbar