import React, { useCallback } from "react"
import { memo } from "react"
import TreeNodeLabel from "./TreeNodeLabel"
import { PRIMARY_COLOR } from "../../consts";
import { useSelectedAppId } from "../hooks/useSelectedAppId"
import { useRecoilValue } from 'recoil';
import { selectedElementState } from './../recoil/atoms';
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { AttributeMeta } from './../meta/AttributeMeta';
import { useDeleteAttribute } from "../hooks/useDeleteAttribute";
import { CONST_ID } from "../meta/Meta";

const AttributeLabel = memo((
  props: {
    attr: AttributeMeta
  }
) => {
  const { attr } = props;
  const appId = useSelectedAppId();
  const selectedElement = useRecoilValue(selectedElementState(appId));
  const removeAttribute = useDeleteAttribute(appId);

  const handleDelete = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    removeAttribute(attr.uuid);
  }, [removeAttribute]);

  return (
    <TreeNodeLabel
      action={
        attr.name !== CONST_ID &&
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
      <div style={{ color: selectedElement === attr.uuid ? PRIMARY_COLOR : undefined }}>
        {attr.name}
      </div>
    </TreeNodeLabel>
  )
})

export default AttributeLabel