import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import "./style.less"
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "../hooks/useShowError";
import { Spin } from "antd";
import { useSelectedAppUuid } from "../plugin-sdk/contexts/appRoot";
import { ModelBoard } from "../common/ModelBoard";
import { minMapState, selectedDiagramState } from "./recoil/atoms";
import { useRecoilValue } from "recoil";
import { Toolbox } from "./Toolbox";
import { UmlToolbar } from "./UmlToolbar";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyBox } from "./PropertyBox";

const AppUml = memo((
  props: {
    actions?: React.ReactNode,
  }
) => {
  const [graph, setGraph] = useState<Graph>();
  const realAppUuid = useSelectedAppUuid();
  const { loading, error } = useReadMeta(realAppUuid);
  const minMap = useRecoilValue(minMapState(realAppUuid));
  const selectedDiagram = useRecoilValue(selectedDiagramState(realAppUuid));
  useShowError(error);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <ModelBoard
        modelList={<EntityTree graph={graph}></EntityTree>}
        toolbox={selectedDiagram && <Toolbox graph={graph}></Toolbox>}
        toolbar={<UmlToolbar />}
        propertyBox={<PropertyBox />}
      >
        {
          selectedDiagram && <>
            <GraphCanvas
              graph={graph}
              onSetGraph={setGraph}
            ></GraphCanvas>
            <div
              className="model-minimap"
              style={{
                display: minMap ? "block" : "none"
              }}
              id="mini-map"
            ></div>
          </>
        }
      </ModelBoard>
    </Spin>
  );
});

export default AppUml;