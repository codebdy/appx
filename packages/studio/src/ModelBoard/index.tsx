import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { ModelContent } from "./ModelContent";

const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  //const selectedService = useSelectedService();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: "100%",
      }}
    >
      <EntityTree graph={graph}></EntityTree>
      <ModelContent graph={graph} onSetGraph={setGraph} />
    </div>
  );
});

export default ModelsBoard;