import React from "react";
import { getIcon } from "../../../shared/icon/data";
import { IIcon } from "../model";
import { isEmpertyIcon, empertyIcon } from "../../../shared/icon/IconInput/index";
import { SvgStringIcon } from "./SvgStringIcon";

export const IconView = (
  props: {
    icon?: IIcon;
  }
) => {
  const { icon } = props;
  if (isEmpertyIcon(icon)) {
    return empertyIcon;
  }

  if (icon.iconKey) {
    const realIcon = getIcon(icon.iconKey);
    if (realIcon?.icon) {
      return <realIcon.icon />;
    }
  }

  if (icon.svgString) {
    return <SvgStringIcon icon={icon.svgString} />;
  }

  return empertyIcon;
};
