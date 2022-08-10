import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "../../models/IMenuNode";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../../atoms";
import { useDesingerKey } from "../../../context";
import React from "react";
import NavItemList from "./NavItemList";
import { Collapse } from "antd";
import { PRIMARY_COLOR } from "../../../../consts";
const { Panel } = Collapse;

const CollpaseGroupInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
    onParentDropable: (drapable: boolean) => void;
  }) => {
    const { provided, snapshot, node, onParentDropable } = props;
    const [hover, setHover] = useState(false);
    const [canDrop, setCanDrop] = useState(true);
    const key = useDesingerKey();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );

    const handleMouseOver = useCallback(() => {
      setHover(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHover(false);
    }, []);

    const handleParentDropable = useCallback(
      (dropable: boolean) => {
        onParentDropable && onParentDropable(dropable);
        setCanDrop(dropable);
      },
      [onParentDropable]
    );

    useEffect(() => {
      onParentDropable && onParentDropable(!hover);
    }, [hover, onParentDropable]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setSelectedId(node.id);
        event.stopPropagation();
      },
      [node.id, setSelectedId]
    );

    const selected = useMemo(
      () => selectedId && selectedId === node.id,
      [node.id, selectedId]
    );
    return (
      <div
        ref={provided.innerRef}
        style={{
          outline: selected ? PRIMARY_COLOR + " solid 1px" : 0,
          position: "relative",
        }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
      >
        <Collapse expandIconPosition="right">
          <Panel header={node.meta.title} key={node.id}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                minHeight: 60,
                borderTop: 0,
              }}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <NavItemList
                node={node}
                onParentDropable={handleParentDropable}
                canDrop={canDrop}
                isSubList={true}
              />
            </div>
          </Panel>
        </Collapse>
      </div>

    );
  }
);
export const CollapseGroup = memo(
  (props: {
    node: IMenuNode;
    index: number;
    onParentDropable: (drapable: boolean) => void;
  }) => {
    const { node, index, onParentDropable } = props;

    return (
      <Draggable draggableId={node.id} index={index}>
        {(provided, snapshot) => (
          <CollpaseGroupInner
            provided={provided}
            snapshot={snapshot}
            node={node}
            onParentDropable={onParentDropable}
          />
        )}
      </Draggable>
    );
  }
);
