import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";
import "./index.less"
import { useSelectedAppUuid } from './hooks/useSelectedAppUuid';
import SavaActions from "./SavaActions";
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "../hooks/useShowError";
import { Spin } from "antd";

const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  //const selectedService = useSelectedService();
  const appUuid = useSelectedAppUuid();

  const { loading, error } = useReadMeta(appUuid);

  useShowError(error);

  return (
    <Spin tip="Loading..." spinning={loading} >
      <div className="system-model-board">
        <div className="model-tree-shell">
          <EntityTree graph={graph}></EntityTree>
        </div>
        <ModelContent appUuid={appUuid} graph={graph} onSetGraph={setGraph} saveActions={<SavaActions />} />
      </div>
    </Spin>
  );
});

export default ModelsBoard;