import React from "react";


export interface IPageContainerProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  hasBreadcrumb?: boolean;
  hasGobackButton?: boolean;
  hasHeaderExtra?: boolean;
  hasTabs?: boolean;
}
