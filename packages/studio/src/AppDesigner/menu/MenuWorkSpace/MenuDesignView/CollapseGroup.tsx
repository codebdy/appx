import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import clx from "classnames";

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
    const [opened, setOpend] = useState(false);
    const [canDrop, setCanDrop] = useState(true);
    const key = useDesingerKey();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );

    const ref = useRef<HTMLDivElement>();

    const handleMouseMove = useCallback((event: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom) {
        setHover(true && opened);
      } else {
        setHover(false)
      }
    }, [opened]);

    useEffect(() => {
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    }, [handleMouseMove])

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

    const handleColapse = useCallback((key?: string) => {
      setOpend(!!key);
    }, []);

    const selected = useMemo(
      () => selectedId && selectedId === node.id,
      [node.id, selectedId]
    );

    return (
      <div
        ref={provided.innerRef}
        className={clx("menu-item", "menu-text-item", { selected: selected, float: snapshot.isDragging })}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
      >
        <div ref={ref}>
          <Collapse expandIconPosition="right" bordered={false} ghost accordion onChange={handleColapse}>
            <Panel
              header={
                <div onClick={handleClick}>
                  {node.meta.title}
                </div>
              }
              key={node.id}
            >
              <div className="collapse-inner" onClick={handleClick}>
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
