import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";
import "./index.less"
import { useSelectedAppUuid } from './hooks/useSelectedAppUuid';
import SavaActions from "./SavaActions";
import { useReadMeta } from "./hooks/useReadMeta";

const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  //const selectedService = useSelectedService();
  const appUuid = useSelectedAppUuid();

  const { loading, error } = useReadMeta(appUuid);

  return (
    <div className="system-model-board">
      <div className="model-tree-shell">
        <EntityTree graph={graph}></EntityTree>
      </div>
      <ModelContent appUuid={appUuid} graph={graph} onSetGraph={setGraph} saveActions ={<SavaActions />} />

    </div>
  );
});

export default ModelsBoard;