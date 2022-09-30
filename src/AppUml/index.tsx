import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import "./style.less"
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "../hooks/useShowError";
import { Spin } from "antd";
import { ModelBoard } from "../common/ModelBoard";
import { minMapState, selectedDiagramState } from "./recoil/atoms";
import { useRecoilValue } from "recoil";
import { Toolbox } from "./Toolbox";
import { UmlToolbar } from "./UmlToolbar";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { useEdittingAppUuid } from "../hooks/useEdittingAppUuid";

const AppUml = memo((
  props: {
    actions?: React.ReactNode,
  }
) => {
  const [graph, setGraph] = useState<Graph>();
  const appUuid = useEdittingAppUuid();
  const { loading, error } = useReadMeta(appUuid);
  const minMap = useRecoilValue(minMapState(appUuid));
  const selectedDiagram = useRecoilValue(selectedDiagramState(appUuid));
  useShowError(error);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <ModelBoard
        modelList={<EntityTree graph={graph}></EntityTree>}
        toolbox={selectedDiagram && <Toolbox graph={graph}></Toolbox>}
        toolbar={<UmlToolbar />}
        propertyBox={<PropertyPanel />}
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