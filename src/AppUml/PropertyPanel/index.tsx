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
import { MethodPanel } from "./MethodPanel/MethodPanel";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { PropertyBox } from "../../common/ModelBoard/PropertyBox";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

export const PropertyPanel = memo(() => {
  const appUuid = useEdittingAppUuid();
  const selectedElement = useRecoilValue(selectedElementState(appUuid));
  const selectedEntity = useClass(selectedElement || "", appUuid);
  const { t } = useTranslation();
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    appUuid
  );
  const { cls: methodCls, method } = useMethod(
    selectedElement || "",
    appUuid
  );
  const relation = useRelation(selectedElement || "", appUuid);

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
