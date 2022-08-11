import React from "react";

export interface IIcon {
  iconKey?: string;
  svgString?: string;
}

export interface IPredefinedIcon {
  iconKey: string;
  icon: React.FC<any>;
  keywords?: string;
}
export interface IIconGroup {
  name: string;
  icons: IPredefinedIcon[]
}

export interface IIconCategory {
  name: string;
  iconGroups: IIconGroup[]
}
