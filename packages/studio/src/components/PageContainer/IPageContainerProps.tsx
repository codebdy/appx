import React from "react";


export interface IPageContainerProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  hasBreadcrumb?: boolean;
  hasGobackButton?: boolean;
  hasActions?: boolean;
  hasHeaderContent?: boolean;
  hasHeaderContentExtra?: boolean;
  hasTabs?: boolean;
  hasFooterToolbar?: boolean;
}
