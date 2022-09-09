import { Button } from "antd"
import React, { CSSProperties } from "react"

export const PopupButton = (
  props: {
    style?: CSSProperties,
    icon: React.ReactElement,
    onToggleVisiable?: () => void,
  }
) => {
  const { style, icon, onToggleVisiable } = props;
  return (
    <Button
      type="primary"
      danger
      shape="circle"
      size='small'
      style={{
        position: "absolute",
        top: -8,
        right: -8,
        width: 16,
        minWidth: 16,
        height: 16,
        zIndex: 10,
        ...style || {},
      }}
      icon={icon}
      onClick={onToggleVisiable}
    >
    </Button>
  )
}