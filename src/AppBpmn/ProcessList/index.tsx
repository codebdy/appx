import { Spin, Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import React, { useCallback, useMemo } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ProcessType } from "../../model/process";
import SvgIcon from "../../common/SvgIcon";
import { useAppParams, useParseLangMessage } from "../../plugin-sdk";
import { selectedBpmnDiagramState } from "../recoil/atoms";
import { CategoryLabel } from "./CategoryLabel";
import { useQueryProcesses } from "../hooks/useQueryProcesses";
import { useShowError } from "../../hooks/useShowError";
import { ProcessLabel } from "./ProcessLabel";
const { DirectoryTree } = Tree;

export const ProcessList = memo(() => {
  const { app } = useAppParams();
  const [selectedDiagramId, setSelecteDiagramId] = useRecoilState(selectedBpmnDiagramState(app.uuid));
  const { processes, error, loading } = useQueryProcesses();
  const { t } = useTranslation();
  const p = useParseLangMessage();

  useShowError(error);

  const getProcessNodes = useCallback((type: ProcessType) => {
    return processes?.filter(proc => proc.type === type).map(process => {
      return {
        key: process.id,
        title: <ProcessLabel process={process} />,
        isLeaf: true,
      }
    })
  }, [processes, p])

  const getCategoryNodes = useCallback(() => {
    return [
      {
        title: <CategoryLabel processType={ProcessType.approvalFlow} title={t("AppBpmn.ApprovalFlow")} />,
        key: "approval-model",
        children: getProcessNodes(ProcessType.approvalFlow)
      },
      {
        title: <CategoryLabel processType={ProcessType.workFlow} title={t("AppBpmn.WorkFlow")} />,
        key: "approval-work",
        children: getProcessNodes(ProcessType.workFlow)
      },
    ]
  }, [getProcessNodes])

  const treeData: DataNode[] = useMemo(() => [
    {
      icon: <SvgIcon>
        <svg style={{ width: "15px", height: "15px" }} viewBox="0 0 1024 1024">
          <path d="M480 384h320a96.11 96.11 0 0 0 96-96V160a96.11 96.11 0 0 0-96-96H480a96.11 96.11 0 0 0-96 96v32H224a96.11 96.11 0 0 0-96 96v160a96.11 96.11 0 0 0 96 96h576a32 32 0 0 1 32 32v160a32 32 0 0 1-32 32H640v-32a96.11 96.11 0 0 0-96-96H224a96.11 96.11 0 0 0-96 96v128a96.11 96.11 0 0 0 96 96h320a96.11 96.11 0 0 0 96-96v-32h160a96.11 96.11 0 0 0 96-96V576a96.11 96.11 0 0 0-96-96H224a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h160v32a96.11 96.11 0 0 0 96 96z m96 480a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32V736a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32zM448 160a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H480a32 32 0 0 1-32-32z" p-id="6008"></path>
        </svg>
      </SvgIcon>,
      title: <CategoryLabel title={t("AppBpmn.BpmnModel")} />,
      key: "0",
      children: getCategoryNodes()
    },

  ], [getCategoryNodes, t]);
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
      <Spin spinning={loading}>
        <DirectoryTree
          defaultExpandedKeys={["0"]}
          selectedKeys={[selectedDiagramId]}
          onSelect={handleSelect}
          treeData={treeData}
        />
      </Spin>
    </div>
  )
})