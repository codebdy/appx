import { IMaterialCollapseItem } from "../../../../../material-sdk/model"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useParseLangMessage } from "../../../../../hooks/useParseLangMessage";
import { Button, Space } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { MultiLangInput } from "../../../../../components/pc";

export const GroupLabel = memo((
  props: {
    group: IMaterialCollapseItem,
    onChange: (group: IMaterialCollapseItem) => void,
    onRemove: (uuid: string) => void
  }
) => {
  const { group, onChange, onRemove } = props;
  const [title, setTitle] = useState(group.title);
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setTitle(group.title);
  }, [group.title])

  const p = useParseLangMessage();
  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);
  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  const handleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const hancleOk = useCallback(() => {
    onChange({ ...group, title: title });
    setEditing(false);
  }, [onChange, group, title]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  const handleDelete = useCallback(() => {
    onRemove(group.uuid);
  }, [onRemove, group.uuid]);

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      hancleOk();
    }
  };

  return (
    <div className="material-group-label"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyUp={handleKeyUp}
    >
      <div className="label-text">
        {
          editing
            ?
            <MultiLangInput
              value={title}
              inline
              onChange={handleChange}
              onKeyUp={handleKeyEnter}
            />
            :
            p(title)
        }
      </div>
      {
        editing
          ?
          <div>
            <Space>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={handleCancel}
              ></Button>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CheckOutlined />}
                onClick={hancleOk}
              ></Button>
            </Space>
          </div>
          :
          (hover &&
            <div>
              <Space>
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                ></Button>
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                ></Button>
              </Space>
            </div>)
      }
    </div>
  )
})