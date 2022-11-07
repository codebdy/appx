import React, { CSSProperties } from "react";
import { getIcon } from "~/shared/icon/data";
import { IIcon } from "../model";
import { isEmpertyIcon, EmpertyIcon } from "~/shared/icon/IconInput/index";
import { SvgStringIcon } from "./SvgStringIcon";

export interface IIconViewProps {
  icon?: IIcon;
  style?: CSSProperties,
  size?: number,
}

export const IconView = (props: IIconViewProps) => {
  const { icon, size, ...other } = props;
  if (isEmpertyIcon(icon)) {
    return <EmpertyIcon {...other} />;
  }

  if (icon.iconKey) {
    const realIcon = getIcon(icon.iconKey);
    if (realIcon?.icon) {
      return <realIcon.icon {...other} />;
    }
  }

  if (icon.svgString) {
    return <SvgStringIcon icon={icon.svgString} {...other} />;
  }

  return <EmpertyIcon {...other} />;
};
