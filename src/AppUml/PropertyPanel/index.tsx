import React, { memo } from "react";
import { ClassPanel } from "./ClassPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useAttribute } from "../hooks/useAttribute";
import { useRelation } from "../hooks/useRelation";
import { useMethod } from "../hooks/useMethod";
import { MethodPanel } from "./MethodPanel";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { useSelectedAppUuid } from "../../plugin-sdk/contexts/appRoot";
import { PropertyBox } from "../../common/ModelBoard/PropertyBox";

export const PropertyPanel = memo(() => {
  const serviceId = useSelectedAppUuid();
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const selectedEntity = useClass(selectedElement || "", serviceId);
  const { t } = useTranslation();
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
    <PropertyBox title={t("AppUml.Properties")} >
      {selectedEntity && <ClassPanel cls={selectedEntity} />}
      {attribute && attributeCls && (
        <AttributePanel attribute={attribute} cls={attributeCls} />
      )}
      {method && methodCls && <MethodPanel method={method} cls={methodCls} />}
      {relation && <RelationPanel relation={relation} />}
      {!selectedElement && (
        <div style={{ padding: "16px" }}>
          <Empty />
        </div>
      )}
    </PropertyBox>
  );
});
