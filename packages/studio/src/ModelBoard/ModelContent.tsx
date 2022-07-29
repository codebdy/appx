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
    saveActions?: React.ReactNode;
  }
  ) => {
    const { appUuid, graph, onSetGraph, saveActions } = props;
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
            {
              selectedDiagram &&
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexFlow: "column",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                <GraphCanvas
                  graph={graph}
                  onSetGraph={onSetGraph}
                ></GraphCanvas>
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: 3,
                    left: 3,
                    width: 140,
                    height: 110,
                    borderRadius: "5px",
                    overflow: "hidden",
                    display: minMap ? "block" : "none",
                    // border: (theme) => `solid 2px ${theme.palette.divider}`,
                    //boxShadow: 5,
                  }}
                  id="mini-map"
                ></div>
              </div>
            }

          </div>
          <div className="property-box-area">
            {
              saveActions &&
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "8px",
                }}
              >
                {saveActions}
              </div>
            }
            {selectedDiagram && <PropertyBox />}
          </div>

        </div>
      </div>
    );
  }
);
