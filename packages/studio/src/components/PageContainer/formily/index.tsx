import { Tabs } from "antd";
import React, { useRef, useState } from "react"
import { PageContainer } from "./PageContainer";
import { RecursionField, useFieldSchema } from '@formily/react';
import "./index.less"
import clx from "classnames"
import { PageHeader } from "./PageHeader";
import { PageBody } from "./PageBody";
import PageHeaderExtra, { IPageHeaderExtraProps } from "./PageHeaderExtra";
import PageHeaderContent, { IPageHeaderContentProps } from "./PageHeaderContent";
import PageContent, { IPageContentProps } from "./PageContent";
import PageTabPanel, { IPageTabPanelProps } from "./PageTabPanel";
import PageFooterToolbar, { IPageFooterToolbarProps } from "./PageFooterToolbar";

const { TabPane } = Tabs;

export interface IPageProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  hasBreadcrumb?: boolean;
  showGoback?: boolean;
  className?: string;
}

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

const Page:React.FC<IPageProps>& {
  HeaderExtra?: React.FC<IPageHeaderExtraProps>,
  HeaderContent?: React.FC<IPageHeaderContentProps>,
  Content?: React.FC<IPageContentProps>,
  TabPanel?: React.FC<IPageTabPanelProps>,
  FooterToolbar?: React.FC<IPageFooterToolbarProps>,
} = (props: IPageProps) => {
  const { showGoback, title, subtitle, hasBreadcrumb, className, children, ...other } = props
  const [selectedTabKey, setSelectedTabKey] = useState("1")
  const fieldSchema = useFieldSchema()
  const slots = {
    headerExtra: null,
    headerContent: null,
    footer: null,
    tabs: [],
    otherChildren: []
  }

  for (const key of Object.keys(fieldSchema.properties || {})) {
    const childSchema = fieldSchema.properties[key]
    if (childSchema["x-component"] === 'Page.HeaderExtra') {
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
    <PageContainer>
      <PageHeader
        className={clx(className, "rx-page-header-responsive")}
        onBack={showGoback ? () => window.history.back() : undefined}
        title={title}
        subTitle={subtitle}
        extra={slots.headerExtra && <RecursionField schema={slots.headerExtra} name={slots.headerExtra.name}/>}
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
    </PageContainer>
  )
}

Page.HeaderExtra = PageHeaderExtra
Page.HeaderContent = PageHeaderContent
Page.Content = PageContent
Page.TabPanel = PageTabPanel
Page.FooterToolbar = PageFooterToolbar

export default Page