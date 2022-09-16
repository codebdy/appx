import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";
import "./index.less"
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "../hooks/useShowError";
import { Spin } from "antd";
import { useSelectedAppUuid } from "../shared/AppRoot/context";
import { ResizableColumn } from "../common/ResizableColumn";

const ModelsBoard = memo((
  props: {
    actions?: React.ReactNode,
  }
) => {
  const [graph, setGraph] = useState<Graph>();
  const realAppUuid = useSelectedAppUuid();
  const { loading, error } = useReadMeta(realAppUuid);

  useShowError(error);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="appx-model-board">
        <ResizableColumn minWidth={200} maxWidth={500}>
          <div className="model-tree-shell">
            <EntityTree graph={graph}></EntityTree>
          </div>
        </ResizableColumn>
        <ModelContent appUuid={realAppUuid} graph={graph} onSetGraph={setGraph} />
      </div>
    </Spin>
  );
});

export default ModelsBoard;