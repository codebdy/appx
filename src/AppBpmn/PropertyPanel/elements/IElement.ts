import React from "react";

export interface IElement{
  type?:string;
  name?:string;
  icon?: React.ReactElement,
  items: React.ReactNode,
}