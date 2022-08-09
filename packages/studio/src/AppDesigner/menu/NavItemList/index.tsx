import { alpha, List } from "@mui/material";
import React, { Fragment } from "react";
import {
  DroppableProvided,
  DroppableStateSnapshot,
  Droppable,
} from "react-beautiful-dnd";
import { CollapseGroup } from "./CollapseGroup";
import { PageNav } from "./PageNav";
import { Subheader } from "./Subheader";
import { IMenuNode, MenuItemType } from "../models/IMenuNode";
import { useGetMenuNode } from "../hooks/useGetMenuNode";
import { useSetRecoilState } from "recoil";
import { navigationSelectedIdState } from "../atoms";

export const NavItemListInner = (props: {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  node: IMenuNode;
  isSubList?: boolean;
  onParentDropable: (drapable: boolean) => void;
}) => {
  const { provided, snapshot, node, isSubList, onParentDropable } = props;
  const nodeIds = node?.childIds;
  const setSelectedId = useSetRecoilState(navigationSelectedIdState);
  const getNode = useGetMenuNode();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!node.parentId) {
      setSelectedId(undefined);
      event.stopPropagation();
    }
  };
  return (
    <List
      ref={provided.innerRef}
      sx={{
        flex: 1,
        height: 0,
        backgroundColor: snapshot.isDraggingOver
          ? alpha("#000", 0.3)
          : undefined,
        p: 1,
        pl: isSubList ? 4 : undefined,
      }}
      onClick={handleClick}
    >
      {nodeIds?.map((nodId, index) => {
        const item = getNode(nodId);
        if (!item) {
          throw new Error("Cant find item by id:" + nodId);
        }
        return (
          <Fragment key={item.id}>
            {item.meta.type === MenuItemType.Group && (
              <CollapseGroup
                key={item.id}
                node={item}
                index={index}
                onParentDropable={onParentDropable}
              />
            )}
            {item.meta.type === MenuItemType.Subheader && (
              <Subheader key={item.id} node={item} index={index} />
            )}
            {item.meta.type === MenuItemType.Item && (
              <PageNav key={item.id} node={item} index={index} />
            )}
          </Fragment>
        );
      })}
      {provided.placeholder}
    </List>
  );
};

export const NavItemList = (props: {
  node: IMenuNode;
  canDrop: boolean;
  isSubList?: boolean;
  onParentDropable: (drapable: boolean) => void;
}) => {
  const { node, canDrop, isSubList, onParentDropable } = props;

  return (
    <Droppable droppableId={node.id} isDropDisabled={!canDrop}>
      {(provided, snapshot) => (
        <NavItemListInner
          provided={provided}
          snapshot={snapshot}
          node={node}
          isSubList={isSubList}
          onParentDropable={onParentDropable}
        />
      )}
    </Droppable>
  );
};
