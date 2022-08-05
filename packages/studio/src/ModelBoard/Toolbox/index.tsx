import React, { memo, useCallback } from "react";
import { Addon, Graph } from "@antv/x6";
import { useEffect } from "react";
import { ClassView } from "../GraphCanvas/ClassView";
import {
  svgInherit,
  svgOneWayAssociation,
  svgTwoWayAggregation,
  svgTwoWayAssociation,
  svgTwoWayCombination,
} from "./constSvg";
import { RelationType } from "../meta/RelationMeta";
import { pressedLineTypeState, selectedElementState } from "../recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCreateTempClassNodeForNew } from "../hooks/useCreateTempClassNodeForNew";
import { ClassRect } from "./ClassRect";
import { StereoType } from "../meta/ClassMeta";
import { Collapse } from "antd";
import { getLocalMessage } from "../../locales/getLocalMessage";
import "./index.less";
import { PRIMARY_COLOR } from "../../consts";
import { useSelectedAppUuid } from "../context";

const { Dnd } = Addon;
const { Panel } = Collapse;

export const ToolItem = memo(
  (props: {
    selected?: boolean;
    children: React.ReactNode;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) => {
    const { children, onMouseDown, onClick, selected } = props;
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          marginBottom: "16px",
          fontSize: "13px",
          color: selected ? PRIMARY_COLOR : undefined,
          cursor: onClick ? "pointer" : "move",
        }}
        data-type="rect"
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

export const Toolbox = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const appUuid = useSelectedAppUuid();
  const setSelemedElement = useSetRecoilState(selectedElementState(appUuid))
  const [pressedLineType, setPressedLineType] = useRecoilState(
    pressedLineTypeState(appUuid)
  );
  const createTempClassNodeForNew = useCreateTempClassNodeForNew(appUuid);

  useEffect(() => {
    const theDnd = graph
      ? new Dnd({
        target: graph,
        scaled: false,
        animation: true,
      })
      : undefined;
    setDnd(theDnd);
  }, [graph]);

  const startDragFn = (stereoType: StereoType) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      setSelemedElement(undefined);
      const nodeConfig = createTempClassNodeForNew(stereoType) as any;
      nodeConfig.component = <ClassView />;
      const node = graph.createNode(nodeConfig);
      dnd?.start(node, e.nativeEvent as any);
    };
  };

  const doRelationClick = useCallback(
    (lineType: RelationType) => {
      if (lineType === pressedLineType) {
        setPressedLineType(undefined);
      } else {
        setPressedLineType(lineType);
      }
    },
    [pressedLineType, setPressedLineType]
  );

  const handleRelationClick = useCallback(
    (lineType: RelationType) => {
      return () => doRelationClick(lineType);
    },
    [doRelationClick]
  );

  return (
    <div className="appx-model-toolbox">
      <Collapse
        className="full-width no-border"
        accordion
        defaultActiveKey={["1"]}
      >
        <Panel header={t("model.Class")} key="1">
          <ToolItem onMouseDown={startDragFn(StereoType.Entity)}>
            <ClassRect oneBorder={false} />
            {t("model.EntityClass")}
          </ToolItem>
          <ToolItem onMouseDown={startDragFn(StereoType.Abstract)}>
            <ClassRect stereoChar="A" oneBorder={false} />
            {t("model.AbstractClass")}
          </ToolItem>
          <ToolItem onMouseDown={startDragFn(StereoType.Enum)}>
            <ClassRect stereoChar="E" oneBorder={true} />
            {t("model.EnumClass")}
          </ToolItem>
          <ToolItem onMouseDown={startDragFn(StereoType.ValueObject)}>
            <ClassRect stereoChar="V" oneBorder={true} />
            {t("model.ValueClass")}
          </ToolItem>
          <ToolItem onMouseDown={startDragFn(StereoType.Service)}>
            <ClassRect stereoChar="V" oneBorder={true} />
            {t("model.ServiceClass")}
          </ToolItem>
          <ToolItem
            selected={pressedLineType === RelationType.INHERIT}
            onClick={handleRelationClick(RelationType.INHERIT)}
          >
            {svgInherit}
            {t("model.Inherit")}
          </ToolItem>
        </Panel>
        <Panel header={t("model.Relationships")} key="2">
          <ToolItem
            selected={pressedLineType === RelationType.TWO_WAY_ASSOCIATION}
            onClick={handleRelationClick(RelationType.TWO_WAY_ASSOCIATION)}
          >
            {svgTwoWayAssociation}
            {t("model.Association")}
          </ToolItem>
          <ToolItem
            selected={pressedLineType === RelationType.TWO_WAY_AGGREGATION}
            onClick={handleRelationClick(RelationType.TWO_WAY_AGGREGATION)}
          >
            {svgTwoWayAggregation}
            {t("model.Aggregation")}
          </ToolItem>
          <ToolItem
            selected={pressedLineType === RelationType.TWO_WAY_COMBINATION}
            onClick={handleRelationClick(RelationType.TWO_WAY_COMBINATION)}
          >
            {svgTwoWayCombination}
            {t("model.Combination")}
          </ToolItem>
          <ToolItem
            selected={pressedLineType === RelationType.ONE_WAY_ASSOCIATION}
            onClick={handleRelationClick(RelationType.ONE_WAY_ASSOCIATION)}
          >
            {svgOneWayAssociation}
            {t("model.OneWanAssociation")}
          </ToolItem>
        </Panel>
      </Collapse>
      {/* <CategoryCollapse title={intl.get("one-way-relation")}>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_ASSOCIATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_ASSOCIATION)}
        >
          {svgOneWayAssociation}
          {intl.get("association")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_AGGREGATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_AGGREGATION)}
        >
          {svgOneWayAggregation}
          {intl.get("aggregation")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_COMBINATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_COMBINATION)}
        >
          {svgOneWayCombination}
          {intl.get("combination")}
        </ToolItem>
      </CategoryCollapse>
      <CategoryCollapse title={intl.get("others")} disabled>
        <ToolItem
        // onMouseDown={startDragFn(StereoType.Association)}
        >
          <ClassRect stereoChar="R" oneBorder = {true} />
          {intl.get("association-class")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.LINK_LINE}
          //onClick={handleRelationClick(RelationType.LINK_LINE)}
        >
          {svgLinkLine}
          {intl.get("link-line")}
        </ToolItem>
      </CategoryCollapse> */}
    </div>
  );
});
