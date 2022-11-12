import React, { memo, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import "./style.less"
import { useReadMeta } from "./hooks/useReadMeta";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { Spin } from "antd";
import { ModelBoard } from "~/common/ModelBoard";
import { minMapState, selectedElementState, selectedUmlDiagramState } from "./recoil/atoms";
import { useRecoilValue } from "recoil";
import { Toolbox } from "./Toolbox";
import { UmlToolbar } from "./UmlToolbar";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { CodeEditor } from "./CodeEditor";
import { useIsCode } from "./hooks/useIsCode";

const AppUml = memo((
  props: {
    actions?: React.ReactNode,
  }
) => {
  const [graph, setGraph] = useState<Graph>();
  const appId = useEdittingAppId();
  const { loading, error } = useReadMeta(appId);
  const minMap = useRecoilValue(minMapState(appId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(appId));
  const selectedElement = useRecoilValue(selectedElementState(appId));
  const isCode = useIsCode(appId);
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
          selectedDiagram &&
          <div style={{
            display: "flex",
            flex: 1,
            flexFlow: "column",
            overflow: "auto"
          }}>
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
          </div>
        }
        {
          isCode(selectedElement) &&
          <CodeEditor />
        }
      </ModelBoard>
    </Spin>
  );
});

export default AppUml;