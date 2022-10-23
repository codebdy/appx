import { Menu } from "antd";
import { IMenuItem, MenuItemType } from "@rxdrag/plugin-sdk/model/IMenuNode";
import React, { memo, useCallback, useMemo } from "react";
import { useRunnerParams } from "@rxdrag/plugin-sdk/contexts/runner";
import { IconView } from "@rxdrag/plugin-sdk/icon/IconView";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItem } from "./hooks/useGetMenuItem";
import { useEntryPageId } from "./hooks/useEntryPageId";
import { useGetMenuItemByPageId } from "./hooks/useGetMenuItemByPageId";

export interface IComponentProps{
  
}

const AppMenu = memo(() => {
  const { menu } = useRunnerParams();
  const p = useParseLangMessage();
  const { device, appId, menuUuid } = useParams();
  const navigate = useNavigate();

  const entryId = useEntryPageId();

  const getMenuItem = useGetMenuItem();
  const getMenuItemByPageId = useGetMenuItemByPageId();

  const makeItem = useCallback((item: IMenuItem) => {
    return ({
      key: item.uuid,
      icon: <IconView icon={item.icon} />,
      label: p(item.title),
      children: !item.children?.length ? undefined : item.children?.map((child) => makeItem(child)),
      type: item.type === MenuItemType.Divider ? "divider" : undefined
    })
  }, [p]);

  const data: ItemType[] = useMemo(() => {
    const rtValue = [];
    for (const item of menu?.schemaJson?.items || []) {
      rtValue.push(makeItem(item))
    }
    return rtValue
  }, [makeItem, menu?.schemaJson?.items]);

  const handleClick = useCallback(({ key }) => {
    const item = getMenuItem(key);

    if (item?.type === MenuItemType.Link) {
      item?.link && window.open(item?.link)
    } else if (item?.type !== MenuItemType.Divider) {
      navigate(`/app/${device}/${appId}/${item.uuid}`)
    }
  }, [appId, device, getMenuItem, navigate]);

  return (
    <>
      <Menu
        //theme="dark"
        mode="inline"
        selectedKeys={[(menuUuid !== "no" && menuUuid) || getMenuItemByPageId(entryId)?.uuid]}
        items={data}
        onClick={handleClick}
      />
    </>
  )
})

export default AppMenu;