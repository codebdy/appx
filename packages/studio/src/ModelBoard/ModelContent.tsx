import { memo, useEffect } from "react";
import { Graph } from "@antv/x6";
import { GraphCanvas } from "./GraphCanvas";
import { ModelToolbar } from "./ModelToolbar";
import { Toolbox } from "./Toolbox";
import EmpertyCanvas from "./EmpertyCanvas";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  minMapState,
  publishedIdState,
  selectedDiagramState,
} from "./recoil/atoms";
import { PropertyBox } from "./PropertyBox";
import { usePublishedMeta } from "./hooks/usePublishedMeta";
import { ID } from "../shared";
import { useShowError } from "../hooks/useShowError";
import React from "react";

export const ModelContent = memo(
  (props: { appId: ID; graph?: Graph; onSetGraph: (graph?: Graph) => void }) => {
    const { appId, graph, onSetGraph } = props;
    const setPublishedId = useSetRecoilState(publishedIdState(appId));
    const selectedDiagram = useRecoilValue(selectedDiagramState(appId));
    const minMap = useRecoilValue(minMapState(appId));
    console.log("哈哈", appId, selectedDiagram)
    // const { meta, error } = usePublishedMeta();
    // useShowError(error);
    // useEffect(() => {
    //   setPublishedId(meta?.id || undefined);
    // }, [meta?.id, setPublishedId]);

    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
        }}
      >
        <ModelToolbar />
        <div style={{ width: "100%", flex: 1, display: "flex", height: "0" }}>
          {selectedDiagram ? (
            <>
              <Toolbox graph={graph}></Toolbox>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexFlow: "column",
                    overflow: "auto",
                    position: "relative",
                    // "& .x6-widget-minimap": {
                    //   backgroundColor: (theme) =>
                    //     theme.palette.background.paper,
                    //   "& .x6-graph": {
                    //     boxShadow: (theme) => theme.shadows[0],
                    //   },
                    // },
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
              </div>
            </>
          ) : (
            <EmpertyCanvas></EmpertyCanvas>
          )}
          <PropertyBox></PropertyBox>
        </div>
      </div>
    );
  }
);
