import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React from "react";
import { memo } from "react";
import clx from "classnames";
import { menuCollapsedWidth, menuWidth } from ".";
const { Header } = Layout;

const ProHeader = memo((
  props: {
    collapsed?: boolean,
    fixed?: boolean,
    children?: React.ReactNode,
    onTrigger?: () => void,
  }
) => {
  const { collapsed, fixed = true, children, onTrigger } = props;

  return (
    <>
      {
        fixed &&
        <Header
          className={clx("site-layout-background toolbar")}
        >
        </Header>
      }
      <Header
        className={clx("site-layout-background toolbar", { fixedHeader: fixed })}
      >
        <div>
          {
            fixed &&
            <div
              style={{
                width: collapsed ? menuCollapsedWidth : menuWidth,
                transition: "width 0.2s"
              }}
            ></div>
          }
        </div>
        <Button type="text" shape="circle" onClick={onTrigger}
          icon={
            collapsed ?
              <MenuUnfoldOutlined />
              : <MenuFoldOutlined />
          }
        />
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