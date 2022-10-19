import React, { memo, useEffect } from "react";
import { useExplorerScrollbarHide } from "./useExplorerScrollbarHide";
import { useEdgeLineDraw } from "./useEdgeLineDraw";
import { useEdgeChange } from "./useEdgeChange";
import { Graph } from "@antv/x6";
import { getGraphConfig } from "./getGraphConfig";
import { useNodesShow } from "./useNodesShow";
import { useNodeAdd } from "./useNodeAdd";
import { useNodeChange } from "./useNodeChange";
import { useNodeSelect } from "./useNodeSelect";
import { useEdgesShow } from "./useEdgesShow";
import { useEdgeSelect } from "./useEdgeSelect";
import { useTriggerSelectedEvent } from "./useTriggerSelectedEvent";
import { useEdgeHover } from "./useEdgeHover";
import { useTriggerPressedLineTypeEvent } from "./useTriggerPressedLineTypeEvent";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

export const GraphCanvas = memo(
  (props: {
    graph?: Graph;
    onSetGraph: (graph?: Graph) => void,
  }) => {
    const { graph, onSetGraph } = props;
    const appUuid = useEdittingAppUuid();

    useEffect(() => {
      const config = getGraphConfig();
      const aGraph = new Graph(config as any);
      onSetGraph(aGraph);
      return () => {
        aGraph?.dispose();
        onSetGraph(undefined);
      };
    }, [onSetGraph]);

    useExplorerScrollbarHide();
    useTriggerSelectedEvent(appUuid);
    useTriggerPressedLineTypeEvent(appUuid);
    useNodeSelect(graph, appUuid);
    useEdgeSelect(graph, appUuid);
    useNodesShow(graph, appUuid);
    useEdgeLineDraw(graph, appUuid);
    useEdgesShow(graph, appUuid);
    useNodeChange(graph, appUuid);
    useEdgeChange(graph, appUuid);
    useNodeAdd(graph, appUuid);
    useEdgeHover(graph, appUuid);

    return (
      <div
        id="container"
        style={{
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
      ></div>
    );
  }
);
