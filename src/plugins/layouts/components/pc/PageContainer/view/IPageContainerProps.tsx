import React from "react";
import { IDataSourceableProps } from "../../../../../../plugin-sdk/model/IDataSourceableProps";

export interface IPageContainerProps extends IDataSourceableProps{
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
