import React, { CSSProperties } from "react";
import { IDataSourceableProps } from "@rxdrag/plugin-sdk/model/IDataSourceableProps";

export interface IPageContainerProps extends IDataSourceableProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  hasBreadcrumb?: boolean;
  hasGobackButton?: boolean;
  hasActions?: boolean;
  hasHeaderContent?: boolean;
  hasHeaderContentExtra?: boolean;
  hasTabs?: boolean;
  hasFooterToolbar?: boolean;
}
