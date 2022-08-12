import React from "react";
import NavMenu from "./NavMenu";

const ProLayout = (
  props: {
    title?: React.ReactNode,
    logo?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  return (
    <div>
      <NavMenu />
    </div>
  )
}

export default ProLayout;