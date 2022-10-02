import { Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import React, { useCallback, useMemo } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import SvgIcon from "../../common/SvgIcon";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { useAppParams } from "../../plugin-sdk";
import { selectedBpmnDiagramState } from "../recoil/atoms";
import RootAction from "./RootAction";
const { DirectoryTree } = Tree;

export const ProcessList = memo(() => {
  const { app } = useAppParams();
  const [selectedDiagramId, setSelecteDiagramId] = useRecoilState(selectedBpmnDiagramState(app.uuid));
  const { t } = useTranslation();
  const treeData: DataNode[] = useMemo(() => [
    {
      icon: <SvgIcon>
        <svg style={{ width: "15px", height: "15px" }} viewBox="0 0 1024 1024">
          <path d="M480 384h320a96.11 96.11 0 0 0 96-96V160a96.11 96.11 0 0 0-96-96H480a96.11 96.11 0 0 0-96 96v32H224a96.11 96.11 0 0 0-96 96v160a96.11 96.11 0 0 0 96 96h576a32 32 0 0 1 32 32v160a32 32 0 0 1-32 32H640v-32a96.11 96.11 0 0 0-96-96H224a96.11 96.11 0 0 0-96 96v128a96.11 96.11 0 0 0 96 96h320a96.11 96.11 0 0 0 96-96v-32h160a96.11 96.11 0 0 0 96-96V576a96.11 96.11 0 0 0-96-96H224a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h160v32a96.11 96.11 0 0 0 96 96z m96 480a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32V736a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32zM448 160a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H480a32 32 0 0 1-32-32z" p-id="6008"></path>
        </svg>
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<RootAction />}>
          <div>{t("AppBpmn.BpmnModel")}</div>
        </TreeNodeLabel>,
      key: "0",
      //children: getPackageNodes()
    },

  ], [t]);
  const handleSelect = useCallback((keys: string[]) => {
    // for (const uuid of keys) {
    //   if (isDiagram(uuid)) {
    //     setSelecteDiagramId(uuid);
    //   } else if (isElement(uuid)) {
    //     setSelectedElement(uuid);
    //   } else {
    //     const relationUuid = parseRelationUuid(uuid);
    //     if (relationUuid) {
    //       setSelectedElement(relationUuid);
    //     }
    //   }
    // }
  }, [setSelecteDiagramId])

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        padding: 8,
      }}
    >
      <DirectoryTree
        selectedKeys={[selectedDiagramId]}
        onSelect={handleSelect}
        treeData={treeData}
      />
    </div>
  )
})