import { Layout } from "antd";
import React from "react";
import MenuSider from "./MenuSider";
import "./style.less";
const { Header, Content, Footer } = Layout;

const ProLayout = (
  props: {
    title?: React.ReactNode,
    logo?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  return (
    <Layout className="appx-pro-layout">
      <MenuSider />
      <Layout>
        <Header>
          Header
        </Header>
        <Content>
          Content
        </Content>
        <Footer>
          Footer
        </Footer>
      </Layout>
    </Layout>
  )
}

export default ProLayout;