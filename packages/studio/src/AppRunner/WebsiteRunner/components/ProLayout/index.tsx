import { Layout } from "antd";
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
    <Layout className="appx-pro-layout">
      <NavMenu />
    </Layout>
  )
}

export default ProLayout;