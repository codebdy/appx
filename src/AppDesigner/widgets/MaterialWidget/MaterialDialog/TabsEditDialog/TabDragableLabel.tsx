import React, { CSSProperties, useCallback, useEffect, useState } from "react"
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons"
import clx from "classnames";
import { IMaterialTab } from "@rxdrag/appx-plugin-sdk";
import { useParseLangMessage } from "../../../../../plugin-sdk/hooks/useParseLangMessage";
import { Button, Space } from "antd";
import { MultiLangInput } from "../../../../../plugins/inputs/components/pc/MultiLangInput/view";

export const TabDragableLabel = React.forwardRef((
  props: {
    tab: IMaterialTab,
    float?: boolean,
    style?: CSSProperties,
    fixed?: boolean,
    className?: string,
    onChange: (tab: IMaterialTab) => void,
    onRemove: (uuid: string) => void
  },
  ref: any
) => {
  const { tab, float, style, className, fixed, onChange, onRemove, ...other } = props;
  const [title, setTitle] = useState(tab.title);
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setTitle(tab.title);
  }, [tab.title])

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
    onChange({ ...tab, title: title });
    setEditing(false);
  }, [onChange, tab, title]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  const handleDelete = useCallback(() => {
    onRemove(tab.uuid);
  }, [onRemove, tab.uuid]);

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      hancleOk();
    }
  };

  return (
    <div ref={ref} className={clx("draggable-label", className)} {...other}
      style={{
        ...style,
        boxShadow: float || (hover && !fixed) ? "2px 2px 10px 1px rgb(25 42 70 / 11%)" : undefined,
        pointerEvents: float ? "none" : undefined,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyUp={handleKeyUp}
    >
      <div className="draggable-icon">
        <HolderOutlined />
      </div>
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