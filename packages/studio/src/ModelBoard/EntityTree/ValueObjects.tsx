import TreeItem from "@mui/lab/TreeItem";
import { TREE_ROOT_ID } from "util/consts";
import { TreeNodeLabel } from "./TreeNodeLabel";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { NodeText } from "./NodeText";
import { ClassNode } from "./ClassNode";
import intl from "react-intl-universal";
import { memo } from "react";
import { Graph } from "@antv/x6";
import { useValueObjects } from "../hooks/useValueObjects";

export const ValueObjects = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useSelectedAppId();
  const valueObjects = useValueObjects(serviceId);
  

  return valueObjects.length > 0 ? (
    <TreeItem
      nodeId={TREE_ROOT_ID + "VALUE_OBJECTS"}
      label={
        <TreeNodeLabel>
          <FolderOutlinedIcon />
          <NodeText>{intl.get("value-objects")}</NodeText>
        </TreeNodeLabel>
      }
    >
      {valueObjects.map((entity) => {
        return <ClassNode key={entity.uuid} uuid={entity.uuid} graph={graph} />;
      })}
    </TreeItem>
  ) : (
    <></>
  );
});
