import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { useSelectedService } from "./hooks/useSelectedService";
import { ModelContent } from "./ModelContent";

const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  const selectedService = useSelectedService();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: "0",
      }}
    >
      {!!selectedService && (
        <>
          <EntityTree graph={graph}></EntityTree>
          <ModelContent graph={graph} onSetGraph={setGraph} />
        </>
      )}
    </div>
  );
});

export default ModelsBoard;