import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React, { useMemo } from "react";
import { memo } from "react";
import clx from "classnames";
import { menuCollapsedWidth, menuWidth } from ".";
const { Header } = Layout;

const ProHeader = memo((
  props: {
    collapsed?: boolean,
    fixed?: boolean,
    scrolled?: boolean,
    children?: React.ReactNode,
    onTrigger?: () => void,
  }
) => {
  const { collapsed, fixed = true, scrolled, children, onTrigger } = props;
  const menuSiderWidth = useMemo(() => collapsed ? menuCollapsedWidth : menuWidth, [collapsed]);
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
        className={clx("site-layout-background toolbar", { "fixed-header": fixed, "float": scrolled })}
        style={{
          width: fixed && `calc(100% - ${menuSiderWidth}px)`,
        }
        }
      >
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