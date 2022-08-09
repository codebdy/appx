import React, { useCallback, useEffect, useState } from "react";
import { Container, Box, useTheme, IconButton } from "@mui/material";
import { cloneObject } from "packages/rx-drag/utils/cloneObject";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { COLLAPSE_GROUP_ID, PAGE_LIST_ID, SUBHEADER_ID } from "./consts";
import intl from "react-intl-universal";
import { NavItemList } from "./NavItemList";
import { NodePanel } from "./NodePanel";
import { IMenuNode } from "./models/IMenuNode";
import { parseMeta } from "./hooks/useParseMenuMeta";
import _ from "lodash";
import { useGetMenuNode } from "./hooks/useGetMenuNode";
import { useInsertAt } from "./hooks/useInsertAt";
import IMenuItem, {
  MenuItemType,
} from "components/Workspace/NavDrawer/NavList/IMenuItem";
import { useShowError } from "recoil/hooks/useShowError";
import {
  isNavigationDirtyState,
  navigationNodesState,
  navigationRootNodeState,
  navigationSelectedIdState,
  redoListState,
  undoListState,
} from "./atoms";
import { useRecoilState } from "recoil";
import { TopToolbar } from "../TopToolbar";
import { NavDrawerSkeleton } from "components/Workspace/NavDrawer/NavDrawerSkeleton";
import { ItemsAccordion } from "./ItemsAccordion";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { RxPage } from "packages/rx-entity-interfaces/RxPage";
import { SaveNavigationButton } from "./SaveNavigationButton";
import RouterPrompt from "components/common/RouterPrompt";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { useNavigationItems } from "../../hooks/useNavigationItems";
import { useModules } from "../hooks/useModules";
import { useChildrenScrollbarStyles } from "theme/useChildrenScrollbarStyles";

const groupIcon = `
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M11 15.5H12.5V17H11V15.5M12 6.95C14.7 7.06 15.87 9.78 14.28 11.81C13.86 12.31 13.19 12.64 12.85 13.07C12.5 13.5 12.5 14 12.5 14.5H11C11 13.65 11 12.94 11.35 12.44C11.68 11.94 12.35 11.64 12.77 11.31C14 10.18 13.68 8.59 12 8.46C11.18 8.46 10.5 9.13 10.5 9.97H9C9 8.3 10.35 6.95 12 6.95M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12Z" />
  </svg>
`;

// const pageIcon = `
//   <svg viewBox="0 0 24 24">
//     <path fill="currentColor" d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
//   </svg>
// `;

const rootMeta: IMenuItem = { type: MenuItemType.Group };

export const NavigationEditor = () => {
  const [canDrop, setCanDrop] = useState(true);
  const theme = useTheme();
  const [navigationId, setNavigationId] = useState<number>();
  const [rootNode, setRootNode] = useRecoilState(navigationRootNodeState);
  const [isDirty, setIsDirty] = useRecoilState(isNavigationDirtyState);
  const [selectedId, setSelectedId] = useRecoilState(navigationSelectedIdState);
  const [nodes, setNodes] = useRecoilState(navigationNodesState);
  const [undoList, setUndoList] = useRecoilState(undoListState);
  const [redoList, setRedoList] = useRecoilState(redoListState);

  const scrollbarStyles = useScrollbarStyles();

  const { navigation, error, loading } = useNavigationItems();

  const { modules, loading: modulesLoading } = useModules();

  const navigationItems: IMenuItem[] | undefined | null = navigation?.content;
  useShowError(error);

  const getNode = useGetMenuNode();
  const insertAt = useInsertAt();
  const childrenScrollStyle = useChildrenScrollbarStyles();

  useEffect(() => {
    if (!rootNode) {//防止保存编辑器刷新，并且保证主菜单刷新
      setNavigationId(navigation?.id);
      rootMeta.children = cloneObject(navigationItems || []);
      const nodes: IMenuNode[] = [];
      const node = parseMeta(rootMeta, nodes);
      setRootNode(node);
      setNodes(nodes);
      setIsDirty(false);
      setSelectedId(undefined);
    }
  }, [
    navigation?.id,
    navigationItems,
    rootNode,
    setIsDirty,
    setNodes,
    setRootNode,
    setSelectedId,
  ]);

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
              title: intl.get("collapse-group"),
              icon: groupIcon,
            },
            childIds: [],
          };
        } else if (draggableId === SUBHEADER_ID) {
          draggedNode = {
            id: _.uniqueId(),
            meta: {
              type: MenuItemType.Subheader,
              title: intl.get("title"),
              icon: groupIcon,
            },
            childIds: [],
          };
        } else if (source.droppableId.startsWith(PAGE_LIST_ID)) {
          let page: RxPage | undefined;
          for (const module of modules || []) {
            for (const pg of module.pages || []) {
              if (draggableId === pg.uuid) {
                page = pg;
                break;
              }
            }
          }
          if (page) {
            draggedNode = {
              id: _.uniqueId(),
              meta: {
                type: MenuItemType.Item,
                title: page.name,
                //icon: pageIcon,
                route: { pageUuid: page.uuid },
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
    [getNode, insertAt, modules]
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
    <>
      <RouterPrompt promptBoolean={isDirty} />
      <TopToolbar
        startButtons={
          <>
            <IconButton
              sx={{ ml: 2 }}
              disabled={undoList.length === 0}
              onClick={handleUndo}
            >
              <UndoOutlinedIcon />
            </IconButton>
            <IconButton disabled={redoList.length === 0} onClick={handleRedo}>
              <RedoOutlinedIcon />
            </IconButton>
          </>
        }
      >
        <SaveNavigationButton navigationId={navigationId} />
      </TopToolbar>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexFlow: "column",
          background: theme.palette.background.default,
          overflowY: "auto",
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            p: 2,
            color: theme.palette.text.primary,
            ...childrenScrollStyle,
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Box
              sx={{
                width: theme.spacing(40),
                display: "flex",
                mr: 8,
              }}
              onClick={handleNotBlankClick}
            >
              {selectedId && <NodePanel />}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                pr: 7,
                overflowY: "auto",
                ...scrollbarStyles,
              }}
              onClick={handleBlankClick}
            >
              <Box
                sx={{
                  border: theme.palette.divider + " solid 1px",
                  width: theme.spacing(35),
                  flex: 1,
                  display: "flex",
                  flexFlow: "column",
                  bgcolor: "background.paper",
                  borderRadius: theme.spacing(1),
                }}
              >
                {loading && <NavDrawerSkeleton />}
                {rootNode && !loading && (
                  <NavItemList
                    node={rootNode}
                    onParentDropable={handleDropable}
                    canDrop={canDrop}
                  />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: theme.spacing(30),
                ml: 1,
                display: "flex",
                flexFlow: "column",
                height: "100%",
                overflowY: "auto",
                pr: 1,
                ...scrollbarStyles,
              }}
              onClick={handleNotBlankClick}
            >
              {modulesLoading ? (
                <NavDrawerSkeleton />
              ) : (
                <ItemsAccordion modules={modules} />
              )}
            </Box>
          </DragDropContext>
        </Container>
      </Box>
    </>
  );
};
