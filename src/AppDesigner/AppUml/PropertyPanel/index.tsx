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
import { PropertyBox } from "~/common/ModelBoard/PropertyBox";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { useSelectedCode } from "../hooks/useSelectedCode";
import { CodePanel } from "./CodePanel";

export const PropertyPanel = memo(() => {
  const appId = useEdittingAppId();
  const selectedElement = useRecoilValue(selectedElementState(appId));
  const selectedEntity = useClass(selectedElement || "", appId);
  const slecectedCode = useSelectedCode(appId);
  const { t } = useTranslation();
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    appId
  );
  const { cls: methodCls, method } = useMethod(
    selectedElement || "",
    appId
  );
  const relation = useRelation(selectedElement || "", appId);

  return (
    <PropertyBox title={t("AppUml.Properties")} >
      {selectedEntity && <ClassPanel cls={selectedEntity} />}
      {attribute && attributeCls && (
        <AttributePanel attribute={attribute} cls={attributeCls} />
      )}
      {method && methodCls && <MethodPanel method={method} cls={methodCls} />}
      {relation && <RelationPanel relation={relation} />}
      {slecectedCode && <CodePanel code={slecectedCode} />}
      {!selectedElement && (
        <div style={{ padding: "16px" }}>
          <Empty />
        </div>
      )}
    </PropertyBox>
  );
});
