import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { IMenuNode } from "../../../../model/IMenuNode";
import { useRecoilState } from "recoil";
import { navigationSelectedIdState } from "../../atoms";
import { useAppViewKey } from "../../../../shared/AppRoot/context";
import React from "react";
import NavItemList from "./NavItemList";
import { Collapse } from "antd";
import clx from "classnames";
import { useTranslation } from "react-i18next";
import { IconView } from "../../../../shared/icon/IconView";
import ItemIcon from "./ItemIcon";

const { Panel } = Collapse;

const CollpaseGroupInner = memo(
  (props: {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    node: IMenuNode;
    onParentDropable: (drapable: boolean) => void;
    opened: boolean,
    onOpened: (open?: boolean) => void;
  }) => {
    const { provided, snapshot, node, onParentDropable, opened, onOpened } = props;
    const [mouseOver, setMouseHover] = useState(false);
    const [hover, setHover] = useState(false);
    const [canDrop, setCanDrop] = useState(true);
    const key = useAppViewKey();
    const [selectedId, setSelectedId] = useRecoilState(
      navigationSelectedIdState(key)
    );
    const { t } = useTranslation();

    const ref = useRef<HTMLDivElement>();

    const handleMouseMove = useCallback((event: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom) {
        setMouseHover(true && opened && !snapshot.isDragging);
      } else {
        setMouseHover(false)
      }
    }, [opened, snapshot.isDragging]);

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
      onParentDropable && onParentDropable(!mouseOver);
    }, [mouseOver, onParentDropable]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setSelectedId(node.meta.uuid);
        event.stopPropagation();
      },
      [node.meta.uuid, setSelectedId]
    );

    const handleColapse = useCallback((key?: string) => {
      onOpened(!!key);
    }, [onOpened]);

    const selected = useMemo(
      () => selectedId && selectedId === node.meta.uuid,
      [node.meta.uuid, selectedId]
    );

    const handleMouseEnter = useCallback(() => {
      setHover(true);
    }, [])

    const handleMouseLeave = useCallback(() => {
      setHover(false);
    }, [])

    return (
      <div
        ref={provided.innerRef}
        className={clx("menu-item", "menu-text-item", { selected: selected, float: snapshot.isDragging || (hover && !opened) })}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div ref={ref}>
          <Collapse expandIconPosition="right" bordered={false} ghost accordion onChange={handleColapse}>
            <Panel
              header={
                <div className="item-label" onClick={handleClick}>
                  {node.meta.icon && (
                    <ItemIcon>
                      <IconView
                        icon={node.meta.icon}
                      />
                    </ItemIcon>
                  )}
                  {node.meta.title}
                </div>
              }
              key={node.meta.uuid}
            >
              <div className={clx("collapse-inner", { dashed: !node.childIds.length })} onClick={handleClick}>
                {
                  !node.childIds.length && !snapshot.draggingOver &&
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.6,
                      pointerEvents: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >{t("Menu.DropTip")}</div>
                }
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
    const [opened, setOpened] = useState(false);

    return (
      <Draggable
        draggableId={node.meta.uuid}
        index={index}
        isDragDisabled={opened}
      >
        {(provided, snapshot) => (
          <CollpaseGroupInner
            provided={provided}
            snapshot={snapshot}
            node={node}
            onParentDropable={onParentDropable}
            opened={opened}
            onOpened={setOpened}
          />
        )}
      </Draggable>
    );
  }
);
