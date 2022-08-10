import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "../../models/IMenuNode";
import { memo, useMemo } from "react";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../../atoms";
import { useDesingerKey } from "../../../context";
import React from "react";
import clx from "classnames";

const LinkItemInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
  }) => {
    const { provided, node, snapshot } = props;
    const key = useDesingerKey();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setSelectedId(node.id);
      event.stopPropagation();
    };

    const selected = useMemo(() => selectedId && selectedId === node.id, [node.id, selectedId]);
    return (
      <div
        className={clx("menu-item", "menu-text-item", { selected: selected, float: snapshot.isDragging })}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
      >
        {node?.meta?.title}
      </div>
    );
  }
);

export const LinkItem = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;
  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided, snapshot) => (
        <LinkItemInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
