import React from "react";
import NavMenu from "./NavMenu";
import "./style.less";

const ProLayout = (
  props: {
    title?: React.ReactNode,
    logo?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  return (
    <div className="appx-pro-layout">
      <NavMenu />
    </div>
  )
}

export default ProLayout;