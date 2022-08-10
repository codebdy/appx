import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "../../models/IMenuNode";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../../atoms";
import { useDesingerKey } from "../../../context";
import React from "react";
import { PRIMARY_COLOR } from "../../../../consts";
import { Divider } from "antd";

const DividerInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
  }) => {
    const { provided, snapshot, node } = props;
    const key = useDesingerKey();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setSelectedId(node.id);
      event.stopPropagation();
    };

    const selected = selectedId && selectedId === node.id;
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          outline: selected ? PRIMARY_COLOR + " solid 1px" : 0,
          position: "relative",
        }}
        onClick={handleClick}
      >
        <Divider />
      </div>
    );
  }
);

export const MenuDivider = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;

  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided, snapshot) => (
        <DividerInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
