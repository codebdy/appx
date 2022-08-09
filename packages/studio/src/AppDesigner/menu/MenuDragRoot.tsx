import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IPage } from "../../model";
import { isNavigationDirtyState, navigationNodesState, navigationRootNodeState, navigationSelectedIdState, redoListState, undoListState } from "./atoms";
import { COLLAPSE_GROUP_ID, PAGE_LIST_ID, SUBHEADER_ID } from "./consts";
import { useGetMenuNode } from "./hooks/useGetMenuNode";
import { useInsertAt } from "./hooks/useInsertAt";
import { IMenuNode, MenuItemType } from "./models/IMenuNode";
import _ from "lodash"
import { useTranslation } from "react-i18next";
import "./index.less"

const MenuDragRoot = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const [canDrop, setCanDrop] = useState(true);
  const [navigationId, setNavigationId] = useState<number>();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState);
  const [isDirty, setIsDirty] = useRecoilState(isNavigationDirtyState);
  const [selectedId, setSelectedId] = useRecoilState(navigationSelectedIdState);
  const [nodes, setNodes] = useRecoilState(navigationNodesState);
  const [undoList, setUndoList] = useRecoilState(undoListState);
  const [redoList, setRedoList] = useRecoilState(redoListState);

  const {t} = useTranslation();
  // const { navigation, error, loading } = useNavigationItems();

  // const { modules, loading: modulesLoading } = useModules();

  // const navigationItems: IMenuItem[] | undefined | null = navigation?.content;
  // useShowError(error);

  const getNode = useGetMenuNode();
  const insertAt = useInsertAt();

  useEffect(() => {
    if (!rootNode) {//防止保存编辑器刷新，并且保证主菜单刷新
      // setNavigationId(navigation?.id);
      // rootMeta.children = cloneObject(navigationItems || []);
      // const nodes: IMenuNode[] = [];
      // const node = parseMeta(rootMeta, nodes);
      // setRootNode(node);
      // setNodes(nodes);
      // setIsDirty(false);
      // setSelectedId(undefined);
    }
  }, [navigationId, rootNode, setIsDirty, setNodes, setRootNode, setSelectedId]);

  const handleDropable = useCallback((dropable: boolean) => {
    setCanDrop(dropable);
  }, []);

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
        } else if (draggableId === SUBHEADER_ID) {
          draggedNode = {
            id: _.uniqueId(),
            meta: {
              type: MenuItemType.Subheader,
              title: t("Title"),
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
        }

        if (draggedNode) {
          insertAt(draggedNode, destination?.droppableId, destination.index);
          //targetNode?.insertChildAt(draggedNode, destination.index);
          //setNavEditor((oldData) => ({
          //  ...oldData,
          //  selectedId: draggedNode?.id,
          //  isDirty: true,
          //}));
        }
      }
    },
    [getNode, insertAt, t]
  );

  const handleBlankClick = useCallback(() => {
    setSelectedId(undefined);
  }, [setSelectedId]);

  const handleNotBlankClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    },
    []
  );

  const handleUndo = useCallback(() => {
    const newUndoList = [...undoList];
    const snapshot = newUndoList.pop();
    setUndoList(newUndoList);
    setRedoList((redoList) => [...redoList, { nodes, rootNode, selectedId }]);
    setRootNode(snapshot?.rootNode);
    setNodes(snapshot?.nodes || []);
    setSelectedId(snapshot?.selectedId);
  }, [
    nodes,
    rootNode,
    selectedId,
    setNodes,
    setRedoList,
    setRootNode,
    setSelectedId,
    setUndoList,
    undoList,
  ]);

  const handleRedo = useCallback(() => {
    const newRedoList = [...redoList];
    const snapshot = newRedoList.pop();
    setRedoList(newRedoList);
    setUndoList((undoList) => [...undoList, { nodes, rootNode, selectedId }]);
    setRootNode(snapshot?.rootNode);
    setNodes(snapshot?.nodes || []);
    setSelectedId(snapshot?.selectedId);
  }, [
    nodes,
    redoList,
    rootNode,
    selectedId,
    setNodes,
    setRedoList,
    setRootNode,
    setSelectedId,
    setUndoList,
  ]);


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