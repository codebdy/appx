import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { IPage } from "../../model";
import { isNavigationDirtyState, menuIdState, navigationNodesState, navigationRootNodeState } from "./atoms";
import { COLLAPSE_GROUP_ID, CUSTOMIZED_LINK_ID, DIVIDER_ID, PAGE_LIST_ID } from "./consts";
import { useGetMenuNode } from "./hooks/useGetMenuNode";
import { useInsertAt } from "./hooks/useInsertAt";
import { IMenuItem, IMenuNode, MenuItemType } from "./models/IMenuNode";
import { useTranslation } from "react-i18next";
import "./index.less"
import { useAppKey } from "../../shared/AppRoot/context";
import { useMenu } from "../hooks/useMenu";
import { useShowError } from "../../hooks/useShowError";
import { cloneObject } from "./utils/cloneObject";
import { parseMeta } from "./hooks/useParseMenuMeta";
import { createUuid } from "../../shared";
import { useGetPage } from "../hooks/useGetPage";

const rootMeta: IMenuItem = { type: MenuItemType.Group, uuid: createUuid(), };

const MenuDragRoot = memo((
  props: {
    pages: IPage[],
    children: React.ReactNode
  }
) => {
  const { pages } = props;
  const key = useAppKey();
  const setRootNode = useSetRecoilState(navigationRootNodeState(key));
  const setIsDirty = useSetRecoilState(isNavigationDirtyState(key));
  const setMenuId = useSetRecoilState(menuIdState(key))
  const setNodes = useSetRecoilState(navigationNodesState(key));
  const { t } = useTranslation();
  const { menu, error } = useMenu();
  const getPage = useGetPage(pages);
  useShowError(error);

  const navigationItems: IMenuItem[] | undefined | null = menu?.schemaJson?.items;

  const getNode = useGetMenuNode();
  const insertAt = useInsertAt();

  useEffect(() => {
    setMenuId(menu?.id);
  }, [menu?.id, setMenuId])

  useEffect(() => {
    rootMeta.children = cloneObject(navigationItems || []);
    const nodes: IMenuNode[] = [];
    const node = parseMeta(rootMeta, nodes);
    setRootNode(node);
    setNodes(nodes);
    setIsDirty(false);
    //setSelectedId(undefined);

  }, [menu, navigationItems, setIsDirty, setNodes, setRootNode]);


  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (destination?.droppableId) {
        let draggedNode: IMenuNode | undefined;
        if (draggableId === COLLAPSE_GROUP_ID) {
          draggedNode = {
            meta: {
              uuid: createUuid(),
              type: MenuItemType.Group,
              title: t("Menu.CollapseGroup"),
            },
            childIds: [],
          };
        } else if (draggableId === DIVIDER_ID) {
          draggedNode = {
            meta: {
              uuid: createUuid(),
              type: MenuItemType.Divider,
              title: t("Menu.Divider"),
            },
            childIds: [],
          };
        } else if (draggableId === CUSTOMIZED_LINK_ID) {
          draggedNode = {
            meta: {
              uuid: createUuid(),
              type: MenuItemType.Link,
              title: t("Menu.CustomizedLink"),
            },
            childIds: [],
          };
        } else if (source.droppableId.startsWith(PAGE_LIST_ID)) {
          const page: IPage | undefined = getPage(draggableId);
          if (page) {
            draggedNode = {
              meta: {
                uuid: createUuid(),
                type: MenuItemType.Item,
                title: page.title,
                route: { pageId: page.id },
              },
              childIds: [],
            };
          }
        } else {
          draggedNode = getNode(draggableId);
        }

        if (draggedNode) {
          insertAt(draggedNode, destination?.droppableId, destination.index);
        }
      }
    },
    [getNode, getPage, insertAt, t]
  );


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        {
          props.children
        }
      </>
    </DragDropContext>
  )
})

export default MenuDragRoot