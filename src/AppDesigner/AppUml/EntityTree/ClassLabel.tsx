import { Addon, Graph } from "@antv/x6"
import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { ClassMeta } from "../meta/ClassMeta"
import TreeNodeLabel from "~/common/TreeNodeLabel"
import { PRIMARY_COLOR } from "~/consts";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { ClassView } from "../GraphCanvas/ClassView";
import { useRecoilValue } from 'recoil';
import { selectedElementState, classesState } from './../recoil/atoms';
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useDeleteClass } from "../hooks/useDeleteClass"
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid"

const { Dnd } = Addon;

const ClassLabel = memo((
  props: {
    cls: ClassMeta,
    graph?: Graph
  }
) => {
  const { cls, graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const appId = useEdittingAppId();
  const classes = useRecoilValue(classesState(appId));
  const selectedElement = useRecoilValue(selectedElementState(appId));
  const deleteClass = useDeleteClass(appId);

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
    [dnd, graph]
  );

  const handleDelete = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    deleteClass(cls.uuid);
  }, [cls.uuid, deleteClass]);

  return (
    <TreeNodeLabel
      action={
        <Button
          type="text"
          shape='circle'
          size='small'
          onClick={handleDelete}
        >
          <DeleteOutlined />
        </Button>
      }
    >
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