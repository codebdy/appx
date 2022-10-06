import React from "react";

export interface IElement {
  type?: string;
  name?: string | false;
  icon?: React.ReactElement,
  items: React.ReactNode,
}