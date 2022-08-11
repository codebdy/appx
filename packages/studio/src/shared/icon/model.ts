import React from "react";

export interface IIcon {
  iconKey?: string;
  svgString?: string;
}

export interface IPredefinedIcon {
  iconKey: string;
  keywords?: string;
  icon: React.FC<any>;
}
export interface IIconGroup {
  name: string;
  icons: IPredefinedIcon[]
}

export interface IIconCategory {
  name: string;
  icons: IIconGroup[]
}
