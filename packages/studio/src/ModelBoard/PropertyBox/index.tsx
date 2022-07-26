import React from "react";
import ToolbarArea from "./ToolbarArea";
import ToolbarTitle from "./ToolbarTitle";
import { ClassPanel } from "./ClassPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useAttribute } from "../hooks/useAttribute";
import { useRelation } from "../hooks/useRelation";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { useMethod } from "../hooks/useMethod";
import { MethodPanel } from "./MethodPanel";
import { getLocalMessage } from "../../locales/getLocalMessage";

export const PropertyBox = () => {
  const serviceId = useSelectedAppId();
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const selectedEntity = useClass(selectedElement || "", serviceId);
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    serviceId
  );
  const { cls: methodCls, method } = useMethod(
    selectedElement || "",
    serviceId
  );
  const relation = useRelation(selectedElement || "", serviceId);

  return (
    <div
      className="property-box"
      style={{
        display: "flex",
        flexFlow: "column",
        width: "260px",
      }}
    >
      <ToolbarArea>
        <ToolbarTitle>{getLocalMessage("model.Properties")}</ToolbarTitle>
      </ToolbarArea>
      <div
        style={{
          flex: 1,
          overflow: "auto",
        }}
      >
        {selectedEntity && <ClassPanel cls={selectedEntity} />}
        {attribute && attributeCls && (
          <AttributePanel attribute={attribute} cls={attributeCls} />
        )}
        {method && methodCls && <MethodPanel method={method} cls={methodCls} />}
        {relation && <RelationPanel relation={relation} />}
        {!selectedElement && (
          <div>
            {getLocalMessage("no-selected")}
          </div>
        )}
      </div>
    </div>
  );
};
