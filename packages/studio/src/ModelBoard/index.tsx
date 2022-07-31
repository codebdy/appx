import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";
import "./index.less"
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "../hooks/useShowError";
import { Spin } from "antd";
import { AppContext } from "./context";

const ModelsBoard = memo((
  props: {
    appUuid: string,
    actions?: React.ReactNode,
  }
) => {
  const { appUuid, actions } = props
  const [graph, setGraph] = useState<Graph>();

  const { loading, error } = useReadMeta(appUuid);

  useShowError(error);

  return (
    <AppContext.Provider value={appUuid} >
      <Spin tip="Loading..." spinning={loading}>
        <div className="appx-model-board">
          <div className="model-tree-shell">
            <EntityTree graph={graph}></EntityTree>
          </div>
          <ModelContent appUuid={appUuid} graph={graph} onSetGraph={setGraph} saveActions={actions} />
        </div>
      </Spin>
    </AppContext.Provider>
  );
});

export default ModelsBoard;