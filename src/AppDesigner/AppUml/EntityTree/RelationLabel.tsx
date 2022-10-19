import React, { useCallback } from "react"
import { memo } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { PRIMARY_COLOR } from "../../consts";
import { useRecoilValue } from 'recoil';
import { selectedElementState } from '../recoil/atoms';
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { RelationMeta } from "../meta/RelationMeta";
import { useDeleteRelation } from "../hooks/useDeleteRelation";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

const RelationLabel = memo((
  props: {
    title:string,
    relation: RelationMeta
  }
) => {
  const { title, relation } = props;
  const appUuid = useEdittingAppUuid();
  const selectedElement = useRecoilValue(selectedElementState(appUuid));
  const removeRelation = useDeleteRelation(appUuid);

  const handleDelete = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    removeRelation(relation.uuid);
  }, [relation.uuid, removeRelation]);

  return (
    <TreeNodeLabel
      action={
        <Button
          type="text"
          shape='circle'
          size='small'
          onClick={handleDelete}
        >
          <DeleteOutlined />
        </Button>
      }
    >
      <div style={{ color: selectedElement === relation.uuid ? PRIMARY_COLOR : undefined }}>
        {title}
      </div>
    </TreeNodeLabel>
  )
})

export default RelationLabel