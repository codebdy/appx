import { Menu } from "antd";
import { IMenuItem, MenuItemType } from "../../../model/IMenuNode";
import React, { memo, useCallback, useMemo } from "react";
import { useRunnerParams } from "../../context";
import { IconView } from "../../../shared/icon/IconView";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const MenuContent = memo(() => {
  const { menu } = useRunnerParams();

  const makeItem = useCallback((item: IMenuItem) => {
    return ({
      key: item.uuid,
      icon: <IconView icon={item.icon} />,
      label: item.title,
      children: !item.children?.length ? undefined : item.children?.map((child) => makeItem(child)),
      type: item.type === MenuItemType.Divider ? "divider" : undefined
    })
  }, []);

  const data: ItemType[] = useMemo(() => {
    const rtValue = [];
    for (const item of menu?.schemaJson?.items || []) {
      rtValue.push(makeItem(item))
    }
    return rtValue
  }, [makeItem, menu?.schemaJson?.items]);

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={['1']}
        items={data}
      />
    </>
  )
})

export default MenuContent;