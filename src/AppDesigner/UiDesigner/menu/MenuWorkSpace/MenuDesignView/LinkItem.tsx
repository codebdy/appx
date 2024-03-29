import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "~/plugin-sdk/model/IMenuNode";
import { memo, useMemo } from "react";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../../atoms";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import React from "react";
import clx from "classnames";
import ItemIcon from "./ItemIcon";
import { IconView } from "~/plugin-sdk/icon/IconView";

const LinkItemInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
  }) => {
    const { provided, node, snapshot } = props;
    const key = useDesignerViewKey();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setSelectedId(node.meta.uuid);
      event.stopPropagation();
    };

    const selected = useMemo(() => selectedId && selectedId === node.meta.uuid, [node.meta.uuid, selectedId]);
    return (
      <div
        className={clx("menu-item", "menu-text-item", "menu-single-item", "item-label", { selected: selected, float: snapshot.isDragging })}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
      >
        {node.meta.icon && (
          <ItemIcon>
            <IconView
              icon={node.meta.icon}
            />
          </ItemIcon>
        )}
        {node?.meta?.title}
      </div>
    );
  }
);

export const LinkItem = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;
  return (
    <Draggable draggableId={node.meta.uuid} index={index}>
      {(provided, snapshot) => (
        <LinkItemInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
