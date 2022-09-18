import React, { CSSProperties, useCallback, useState } from "react"
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons"
import clx from "classnames";
import { IMaterialTab } from "../../../../../material-sdk/model";
import { useParseLangMessage } from "../../../../../hooks/useParseLangMessage";
import { Button, Space } from "antd";

const TabDragableLabel = React.forwardRef((
  props: {
    tab: IMaterialTab,
    float?: boolean,
    style?: CSSProperties,
    fixed?: boolean,
    className?: string,
    onChange?: (tab: IMaterialTab) => void,
    onRemove?: (uuid: string) => void
  },
  ref: any
) => {
  const { tab, float, style, className, fixed, onChange, onRemove, ...other } = props;
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
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

  return (
    <div ref={ref} className={clx("draggable-label", className)} {...other}
      style={{
        ...style,
        boxShadow: float || (hover && !fixed) ? "2px 2px 10px 1px rgb(25 42 70 / 11%)" : undefined,
        pointerEvents: float ? "none" : undefined,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="draggable-icon">
        <HolderOutlined />
      </div>
      <div className="label-text">
        {
          p(tab.title)
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
                ></Button>
              </Space>
            </div>)
      }

    </div>
  )
})

export default TabDragableLabel