import { Row, Tabs } from "antd";
import React, { useMemo, useState } from "react"
import { RecursionField, useFieldSchema } from '@formily/react';
import "./style.less"
import { PageHeader } from "./PageHeader";
import { PageBody } from "./PageBody";
import PageHeaderActions, { IHeaderActionsProps } from "./PageHeaderActions";
import PageHeaderContent, { IPageHeaderContentProps } from "./PageHeaderContent";
import PageTabPanel, { IPageTabPanelProps } from "./PageTabPanel";
import PageFooterToolbar, { IPageFooterToolbarProps } from "./PageFooterToolbar";
import { IPageContainerProps } from "./IPageContainerProps";
import { PageContainerShell } from "./PageContainerShell";
import { useBreadcumbItems } from "../../../AppRunner/hooks/useBreadcumbItems";
import PageHeaderContentExtra, { IPageHeaderContentExtraProps } from "./PageHeaderContentExtra";
import { Schema } from "@formily/react";

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
  const slots = useMemo(() => {
    const slts = {
      headerExtra: null,
      headerContent: null,
      headerContentExtra: null,
      footer: null,
      tabs: [],
      otherChildren: []
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'PageContainer.HeaderActions') {
        slts.headerExtra = childSchema
      } else if (childSchema["x-component"] === 'PageContainer.HeaderContent') {
        slts.headerContent = childSchema
      } else if (childSchema["x-component"] === 'PageContainer.FooterToolbar') {
        slts.footer = childSchema
      } else if (childSchema["x-component"] === 'PageContainer.TabPanel') {
        slts.tabs.push(childSchema)
      } else if (childSchema["x-component"] === 'PageContainer.HeaderContentExtra') {
        slts.headerContentExtra = childSchema;
      } else {
        slts.otherChildren.push(childSchema)
      }
    }

    return slts;
  }, [fieldSchema])

  const breadcrumbs = useBreadcumbItems();

  const handleSelectTab = (key: string) => {
    setSelectedTabKey(key);
  };

  const selectedTab = slots.tabs?.[parseInt(selectedTabKey) - 1]
  //const basePath = useMemo(()=>field.path, [field.path]);

  return (
    <PageContainerShell {...other}>
      <PageHeader
        className="rx-page-header-responsive"
        onBack={hasGobackButton ? () => window.history.back() : undefined}
        title={title}
        subTitle={subtitle}
        extra={hasActions && slots.headerExtra && <RecursionField schema={slots.headerExtra} name={slots.headerExtra.name}/>}
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
          {hasHeaderContentExtra && slots.headerContentExtra && <RecursionField schema={slots.headerContentExtra} name={slots.headerContentExtra.name}/>}
        </Row>

      </PageHeader>
      <PageBody>
        {hasTabs && selectedTab && <RecursionField schema={selectedTab} name={selectedTab.name}/>}
        {
          slots.otherChildren?.map((child, index) => {
            return (
              <div key={index}>
                <RecursionField key={index} schema={child} name={child.name}/>
              </div>
            )
          })
        }
        {hasFooterToolbar && slots.footer && <RecursionField schema={slots.footer} name={slots.footer.name}/>}
      </PageBody>
    </PageContainerShell>
  )
}

PageContainer.HeaderActions = PageHeaderActions
PageContainer.HeaderContent = PageHeaderContent
PageContainer.HeaderContentExtra = PageHeaderContentExtra
PageContainer.TabPanel = PageTabPanel
PageContainer.FooterToolbar = PageFooterToolbar