import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { memo } from "react";
import clx from "classnames";

const { Header } = Layout;

const ProHeader = memo((
  props: {
    collapsed?: boolean,
    fixed?: boolean,
    children?: React.ReactNode,
    onTrigger?: () => void,
  }
) => {
  const { collapsed, fixed, children, onTrigger } = props;

  return (
    <>
      <Header
        className={clx("site-layout-background toolbar header-toolbar", { fixedHeader: fixed })}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: onTrigger,
        })}
        <div className="header-content">
          {
            children
          }
        </div>

      </Header>
    </>
  )
})

export default ProHeader;