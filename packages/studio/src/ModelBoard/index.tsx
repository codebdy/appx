import React, { memo, useMemo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";
import "./index.less"
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "../hooks/useShowError";
import { Spin } from "antd";
import { AppContext } from "./context";
import { useParams } from "react-router-dom";

const ModelsBoard = memo((
  props: {
    appUuid?: string,
    actions?: React.ReactNode,
  }
) => {
  const { appUuid } = props
  const { appUuid: appUuidFromUrl } = useParams();
  const [graph, setGraph] = useState<Graph>();
  const realAppUuid = useMemo(()=>appUuid||appUuidFromUrl, [appUuid, appUuidFromUrl])
  const { loading, error } = useReadMeta(realAppUuid);

  useShowError(error);

  return (
    <AppContext.Provider value={realAppUuid} >
      <Spin tip="Loading..." spinning={loading}>
        <div className="appx-model-board">
          <div className="model-tree-shell">
            <EntityTree graph={graph}></EntityTree>
          </div>
          <ModelContent appUuid={realAppUuid} graph={graph} onSetGraph={setGraph} />
        </div>
      </Spin>
    </AppContext.Provider>
  );
});

export default ModelsBoard;