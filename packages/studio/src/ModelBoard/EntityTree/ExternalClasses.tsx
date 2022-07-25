import TreeItem from "@mui/lab/TreeItem";
import { TREE_ROOT_ID } from "util/consts";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { NodeText } from "./NodeText";
import { ClassNode } from "./ClassNode";
import intl from "react-intl-universal";
import { memo } from "react";
import { Graph } from "@antv/x6";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useExternalClasses } from "../hooks/useExternalClasses";

export const ExternalClasses = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useSelectedAppId();
  const externals = useExternalClasses(serviceId);

  return externals.length > 0 ? (
    <TreeItem
      nodeId={TREE_ROOT_ID + "EXTERNALS"}
      label={
        <TreeNodeLabel>
          <FolderOutlinedIcon />
          <NodeText>{intl.get("external-classes")}</NodeText>
        </TreeNodeLabel>
      }
    >
      {externals.map((entity) => {
        return <ClassNode key={entity.uuid} uuid={entity.uuid} graph={graph} />;
      })}
    </TreeItem>
  ) : (
    <></>
  );
});
