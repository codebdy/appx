import React from "react";
import { IDataSource } from "../../datasource";


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
  dataSource?: IDataSource;
}
