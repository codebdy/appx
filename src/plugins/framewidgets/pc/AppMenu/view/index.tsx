import { Menu } from "antd";
import { IMenuItem, MenuItemType } from "@rxdrag/plugin-sdk/model/IMenuNode";
import React, { memo, useCallback, useMemo } from "react";
import { IconView } from "@rxdrag/plugin-sdk/icon/IconView";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItem } from "./hooks/useGetMenuItem";
import { useEntryPageUuid } from "./hooks/useEntryPageUuid";
import { useGetMenuItemByPageUuid } from "./hooks/useGetMenuItemByPageUuid";
import "./style.less"
import cls from "classnames";
import { useMenu } from "~/AppRunner/hooks/useMenu";
import { SYSTEM_APP_ID } from "~/consts";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { useCheckMenuAuth } from "./hooks/useCheckMenuAuth";

export interface IComponentProps {
  mode?: "vertical" | "horizontal" | "inline",
  className?: string,
}

const AppMenu = memo((props: IComponentProps) => {
  const { className, ...other } = props;
  const menu = useMenu()
  const p = useParseLangMessage();
  const { device = Device.PC, appId = SYSTEM_APP_ID, menuUuid } = useParams();
  const navigate = useNavigate();

  const entryId = useEntryPageUuid();

  const getMenuItem = useGetMenuItem();
  const getMenuItemByPageId = useGetMenuItemByPageUuid();
  const checkAuth = useCheckMenuAuth();

  const makeItem = useCallback((item: IMenuItem) => {
    const children = item.children?.filter(item => checkAuth(item))
    return ({
      key: item.uuid,
      icon: <IconView icon={item.icon} />,
      label: p(item.title),
      children: !children?.length
        ? undefined
        : children?.map((child) => makeItem(child)),
      type: item.type === MenuItemType.Divider ? "divider" : undefined
    })
  }, [p]);

  const data: ItemType[] = useMemo(() => {
    const rtValue = [];
    for (const item of menu?.schemaJson?.items?.filter(item => checkAuth(item)) || []) {
      rtValue.push(makeItem(item))
    }
    return rtValue
  }, [makeItem, menu?.schemaJson?.items]);

  const handleClick = useCallback(({ key }) => {
    const item = getMenuItem(key);

    if (item?.type === MenuItemType.Link) {
      item?.link && window.open(item?.link)
    } else if (item?.type !== MenuItemType.Divider) {
      navigate(`/${device}/${appId}/${item.uuid}`)
    }
  }, [appId, device, getMenuItem, navigate]);

  return (
    <>
      <Menu
        className={cls("app-menu", className)}
        {...other}
        selectedKeys={[(menuUuid !== "no" && menuUuid) || getMenuItemByPageId(entryId)?.uuid]}
        items={data}
        onClick={handleClick}
      />
    </>
  )
})

export default AppMenu;