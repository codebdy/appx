import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IPage } from "../../model";
import { isNavigationDirtyState, navigationNodesState, navigationRootNodeState } from "./atoms";
import { COLLAPSE_GROUP_ID, DIVIDER_ID, PAGE_LIST_ID } from "./consts";
import { useGetMenuNode } from "./hooks/useGetMenuNode";
import { useInsertAt } from "./hooks/useInsertAt";
import { IMenuItem, IMenuNode, MenuItemType } from "./models/IMenuNode";
import _ from "lodash"
import { useTranslation } from "react-i18next";
import "./index.less"
import { useDesingerKey } from "../context";
import { useMenu } from "../hooks/useMenu";
import { useShowError } from "../../hooks/useShowError";
import { cloneObject } from "./utils/cloneObject";
import { parseMeta } from "./hooks/useParseMenuMeta";

const rootMeta: IMenuItem = { type: MenuItemType.Group };

const MenuDragRoot = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const key = useDesingerKey();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState(key));
  const setIsDirty = useSetRecoilState(isNavigationDirtyState(key));
  //const [selectedId, setSelectedId] = useRecoilState(navigationSelectedIdState(key));
  const setNodes = useSetRecoilState(navigationNodesState(key));

  const { t } = useTranslation();
  const { menu, error } = useMenu();

  useShowError(error);

  const navigationItems: IMenuItem[] | undefined | null = menu?.schemaJson?.items;
  // useShowError(error);

  const getNode = useGetMenuNode();
  const insertAt = useInsertAt();

  useEffect(() => {
    if (!rootNode) {//防止保存编辑器刷新，并且保证主菜单刷新
      //setNavigationId(navigation?.id);
      rootMeta.children = cloneObject(navigationItems || []);
      const nodes: IMenuNode[] = [];
      const node = parseMeta(rootMeta, nodes);
      setRootNode(node);
      setNodes(nodes);
      setIsDirty(false);
      //setSelectedId(undefined);
    }
  }, [navigationItems, rootNode, setIsDirty, setNodes, setRootNode]);


  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (destination?.droppableId) {
        let draggedNode: IMenuNode | undefined;
        if (draggableId === COLLAPSE_GROUP_ID) {
          draggedNode = {
            id: _.uniqueId(),
            meta: {
              type: MenuItemType.Group,
              title: t("MenuEditor.CollapseGroup"),
              icon: "groupIcon",
            },
            childIds: [],
          };
        } else if (draggableId === DIVIDER_ID) {
          draggedNode = {
            id: _.uniqueId(),
            meta: {
              type: MenuItemType.Divider,
              title: t("MenuEditor.Divider"),
              icon: "groupIcon",
            },
            childIds: [],
          };
        } else if (source.droppableId.startsWith(PAGE_LIST_ID)) {
          let page: IPage | undefined;
          // for (const module of modules || []) {
          //   for (const pg of module.pages || []) {
          //     if (draggableId === pg.uuid) {
          //       page = pg;
          //       break;
          //     }
          //   }
          // }
          if (page) {
            draggedNode = {
              id: _.uniqueId(),
              meta: {
                type: MenuItemType.Item,
                title: page.title,
                //icon: pageIcon,
                route: { pageId: page.id },
              },
              childIds: [],
            };
          }
        } else {
          draggedNode = getNode(draggableId);
          console.log("呵呵", draggableId, draggedNode)
        }

        if (draggedNode) {
          insertAt(draggedNode, destination?.droppableId, destination.index);
        }
      }
    },
    [getNode, insertAt, t]
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