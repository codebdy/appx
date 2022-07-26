import { Addon, Graph } from "@antv/x6"
import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { ClassMeta } from "../meta/ClassMeta"
import TreeNodeLabel from "./TreeNodeLabel"
import { PRIMARY_COLOR } from "../../consts";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { ClassView } from "../GraphCanvas/ClassView";
import { useSelectedAppId } from "../hooks/useSelectedAppId"
import { useRecoilValue } from 'recoil';
import { selectedElementState, classesState } from './../recoil/atoms';
const { Dnd } = Addon;

const ClassLabel = memo((
  props: {
    cls: ClassMeta,
    graph?: Graph
  }
) => {
  const { cls, graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const appId = useSelectedAppId();
  const classes = useRecoilValue(classesState(appId));
  const selectedElement = useRecoilValue(selectedElementState(appId));

  useEffect(() => {
    const theDnd = graph
      ? new Dnd({
        target: graph,
        scaled: false,
        animation: true,
      })
      : undefined;
    setDnd(theDnd);
  }, [graph, classes]);

  const startDragHandle = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cls: ClassMeta) => {
      if (!graph) {
        return;
      }
      const node = graph.createNode({
        ...NODE_INIT_SIZE,
        height: 70 + (cls?.attributes.length || 0) * 26,
        isTempForDrag: true,
        shape: "react-shape",
        component: <ClassView />,
        data: { ...cls, isTempForDrag: true },
      });
      dnd?.start(node, e.nativeEvent as any);
    },
    [dnd, graph, classes]
  );

  return (
    <TreeNodeLabel>
      <div style={{ color: selectedElement === cls.uuid ? PRIMARY_COLOR : undefined }}
        draggable
        onDragStart={e => startDragHandle(e, cls)}
      >
        {cls.name}
      </div>
    </TreeNodeLabel>
  )
})

export default ClassLabel