import { Breadcrumb, Row, Tabs } from "antd";
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
import { useBreadcumbItems } from "./hooks/useBreadcumbItems";
import PageHeaderContentExtra, { IPageHeaderContentExtraProps } from "./PageHeaderContentExtra";
import { Schema } from "@formily/react";
import PageTitle, { IPageTitleProps } from "./PageTitle";
import { useParseLangMessage } from "@rxdrag/plugin-sdk";
import { HomeOutlined } from "@ant-design/icons";
import { useAppParams } from "~/plugin-sdk/contexts/app";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

export const Component: React.FC<IPageContainerProps> & {
  PageTitle?: React.FC<IPageTitleProps>,
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
  const { device, app } = useAppParams();
  const p = useParseLangMessage();
  const navigate = useNavigate();
  const slots = useMemo(() => {
    const slts = {
      title: null,
      headerExtra: null,
      headerContent: null,
      headerContentExtra: null,
      footer: null,
      tabs: [],
      otherChildren: []
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'PageContainer.PageTitle') {
        slts.title = childSchema
      } else if (childSchema["x-component"] === 'PageContainer.HeaderActions') {
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
        title={slots.title && <RecursionField schema={slots.title} name={slots.title?.name} />}
        subTitle={subtitle}
        extra={hasActions && slots.headerExtra && <RecursionField schema={slots.headerExtra} name={slots.headerExtra.name} />}
        footer={
          hasTabs && slots.tabs && <Tabs activeKey={selectedTabKey} onChange={handleSelectTab}>
            {
              slots.tabs.map((tab, index) => {
                return (
                  <TabPane tab={p(tab['x-component-props']?.["title"])} key={index + 1} />
                )
              })
            }

          </Tabs>
        }
        breadcrumb={hasBreadcrumb
          ? <Breadcrumb>
            <Breadcrumb.Item href="javascript:void(0)" onClick={() => navigate(`/${device}/${app.id}`)}>
              <HomeOutlined />
            </Breadcrumb.Item>
            {
              breadcrumbs.map(bread => {
                const href = bread.path ? { href: "javascript:void(0)" } : {};
                return (
                  <Breadcrumb.Item
                    {...href}
                    onClick={() => bread.path ? navigate(bread.path) : undefined}
                  >
                    {bread.breadcrumbName}
                  </Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
          : undefined
        }
      >
        {
          (hasHeaderContent || hasHeaderContentExtra) &&
          <Row>
            {hasHeaderContent && slots.headerContent && <RecursionField schema={slots.headerContent} name={slots.headerContent.name} />}
            {hasHeaderContentExtra && slots.headerContentExtra && <RecursionField schema={slots.headerContentExtra} name={slots.headerContentExtra.name} />}
          </Row>
        }
      </PageHeader>
      <PageBody>
        {hasTabs && selectedTab && <RecursionField schema={selectedTab} name={selectedTab.name} />}
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

Component.PageTitle = PageTitle
Component.HeaderActions = PageHeaderActions
Component.HeaderContent = PageHeaderContent
Component.HeaderContentExtra = PageHeaderContentExtra
Component.TabPanel = PageTabPanel
Component.FooterToolbar = PageFooterToolbar