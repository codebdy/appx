import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "../../../../plugin-sdk/model/IMenuNode";
import { navigationSelectedIdState } from "../../atoms";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { useAppViewKey } from "../../../../plugin-sdk/contexts/appRoot";
import React from "react";
import clx from "classnames";
import ItemIcon from "./ItemIcon";
import { IconView } from "../../../../plugin-sdk/icon/IconView";
import { useParseLangMessage } from "../../../../plugin-sdk/hooks/useParseLangMessage";

const PageNavInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
  }) => {
    const { provided, snapshot, node } = props;
    const key = useAppViewKey();
    const p = useParseLangMessage();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setSelectedId(node.meta.uuid);
      event.stopPropagation();
    };

    const selected = selectedId && selectedId === node.meta.uuid;
    return (
      <div
        ref={provided.innerRef}
        className={clx("menu-item", "menu-text-item", "menu-single-item", "item-label", { selected: selected, float: snapshot.isDragging })}
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
        {p(node.meta?.title)}
      </div>
    );
  }
);

export const PageNav = memo((props: { node: IMenuNode; index: number }) => {
  const { node, index } = props;

  return (
    <Draggable draggableId={node.meta.uuid} index={index}>
      {(provided, snapshot) => (
        <PageNavInner provided={provided} snapshot={snapshot} node={node} />
      )}
    </Draggable>
  );
});
