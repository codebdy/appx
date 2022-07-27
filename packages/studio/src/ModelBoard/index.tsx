import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";
import "./index.less"
import { useSelectedAppUuid } from './hooks/useSelectedAppUuid';
import SavaActions from "./SavaActions";

const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  //const selectedService = useSelectedService();
  const appId = useSelectedAppUuid();

  return (
    <div className="system-model-board">
      <div className="model-tree-shell">
        <EntityTree graph={graph}></EntityTree>
      </div>
      <ModelContent appId={appId} graph={graph} onSetGraph={setGraph} saveActions ={<SavaActions />} />

    </div>
  );
});

export default ModelsBoard;