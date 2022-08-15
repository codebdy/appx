import { Menu } from "antd";
import { IMenuItem, MenuItemType } from "../../../model/IMenuNode";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useRunnerParams } from "../../context/runner";
import { IconView } from "../../../shared/icon/IconView";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useMenuRoute } from "../../context/route";
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";

const MenuContent = memo(() => {
  const [key, setKey] = useState<string>();
  const { menu } = useRunnerParams();
  const { setMenuItem: setItem } = useMenuRoute();
  const p = useParseLangMessage();

  const getMenuItem = useCallback((uuid: string, items?: IMenuItem[]) => {
    for (const item of items || menu?.schemaJson?.items || []) {
      if (item.uuid === uuid) {
        return item;
      }
      const child = getMenuItem(uuid, item?.children || []);
      if (child) {
        return child;
      }
    }
  }, [menu?.schemaJson?.items])

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
      setItem(item)
      setKey(key);
    }
  }, [getMenuItem, setItem]);

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[key]}
        items={data}
        onClick={handleClick}
      />
    </>
  )
})

export default MenuContent;