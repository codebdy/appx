import { memo } from "react";
import { Graph } from "@antv/x6";
import { GraphCanvas } from "./GraphCanvas";
import { ModelToolbar } from "./ModelToolbar";
import { Toolbox } from "./Toolbox";
import { useRecoilValue } from "recoil";
import {
  minMapState,
  selectedDiagramState,
} from "./recoil/atoms";
import { PropertyBox } from "./PropertyBox";
import { ID } from "../shared";
import React from "react";

export const ModelContent = memo(
  (props: {
    appUuid: ID;
    graph?: Graph;
    onSetGraph: (graph?: Graph) => void;
  }
  ) => {
    const { appUuid, graph, onSetGraph } = props;
    const minMap = useRecoilValue(minMapState(appUuid));
    const selectedDiagram = useRecoilValue(selectedDiagramState(appUuid));

    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
        }}
      >
        <div style={{ width: "100%", flex: 1, display: "flex", height: "0" }}>
          {selectedDiagram && <Toolbox graph={graph}></Toolbox>}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
            }}
          >
            <ModelToolbar />
            <div
              style={{
                flex: 1,
                display: "flex",
                height: 0,
              }}>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexFlow: "column",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                {
                  selectedDiagram && <>
                    <GraphCanvas
                      graph={graph}
                      onSetGraph={onSetGraph}
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
              </div>

              <div className="property-box-area">
                <PropertyBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
