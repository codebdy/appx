import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "../../models/IMenuNode";
import { navigationSelectedIdState } from "../../atoms";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { useDesingerKey } from "../../../context";
import React from "react";
import clx from "classnames";

const PageNavInner = memo(
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
        className={clx("menu-item", "menu-text-item", "menu-single-item", { selected: selected, float: snapshot.isDragging })}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
      >
        {/* {node.meta.icon?.trim() && (
          <ListItemIcon>
            <SvgStringIcon
              icon={node.meta.icon}
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItemIcon>
        )} */}
        {node.meta?.title}
      </div>
    );
  }
);

export const PageNav = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;

  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided, snapshot) => (
        <PageNavInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
