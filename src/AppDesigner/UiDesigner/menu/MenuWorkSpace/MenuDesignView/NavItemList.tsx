import React, { Fragment } from "react";
import {
  DroppableProvided,
  DroppableStateSnapshot,
  Droppable,
} from "react-beautiful-dnd";
import { CollapseGroup } from "./CollapseGroup";
import { PageNav } from "./PageNav";
import { MenuDivider } from "./MenuDivider";
import { IMenuNode, MenuItemType } from "@rxdrag/plugin-sdk/model/IMenuNode";
import { useGetMenuNode } from "../../hooks/useGetMenuNode";
import { useSetRecoilState } from "recoil";
import { navigationSelectedIdState } from "../../atoms";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { LinkItem } from "./LinkItem";

export const NavItemListInner = (props: {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  node: IMenuNode;
  isSubList?: boolean;
  onParentDropable: (drapable: boolean) => void;
}) => {
  const { provided, snapshot, node, onParentDropable } = props;
  const key = useDesignerViewKey();
  const nodeIds = node?.childIds;
  const setSelectedId = useSetRecoilState(navigationSelectedIdState(key));
  const getNode = useGetMenuNode();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!node.parentId) {
      setSelectedId(undefined);
      event.stopPropagation();
    }
  };
  return (
    <div
      ref={provided.innerRef}
      style={{
        flex: 1,
        flexFlow: "column",
        backgroundColor: snapshot.isDraggingOver
          ? "rgba(0,0,0, 0.05)"
          : undefined,
      }}
      onClick={handleClick}
    >
      {nodeIds?.map((nodId, index) => {
        const item = getNode(nodId);
        if (!item) {
          throw new Error("Cant find item by id:" + nodId);
        }
        return (
          <Fragment key={item.meta.uuid}>
            {item.meta.type === MenuItemType.Group && (
              <CollapseGroup
                key={item.meta.uuid}
                node={item}
                index={index}
                onParentDropable={onParentDropable}
              />
            )}
            {item.meta.type === MenuItemType.Divider && (
              <MenuDivider key={item.meta.uuid} node={item} index={index} />
            )}
            {item.meta.type === MenuItemType.Link && (
              <LinkItem key={item.meta.uuid} node={item} index={index} />
            )}
            {item.meta.type === MenuItemType.Item && (
              <PageNav key={item.meta.uuid} node={item} index={index} />
            )}
          </Fragment>
        );
      })}
      {provided.placeholder}
    </div>
  );
};

const NavItemList = (props: {
  node: IMenuNode;
  canDrop: boolean;
  isSubList?: boolean;
  onParentDropable?: (drapable: boolean) => void;
}) => {
  const { node, canDrop, isSubList, onParentDropable } = props;

  return (
    <Droppable droppableId={node.meta.uuid} isDropDisabled={!canDrop}>
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

export default NavItemList
