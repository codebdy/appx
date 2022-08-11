import { BorderOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Badge, Button, Modal } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import "./style.less"

const IconInput = memo(() => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  const handelRemove = useCallback(() => {
    console.log("哈哈哈shandiao ")
  }, []);

  const handleShow = useCallback(() => {
    setVisible(true);
  }, [])
  const hancleClose = useCallback(() => {
    setVisible(false);
  }, [])

  return (
    <div
      className="icon-input"
      style={{
        display: "flex",
        alignItems: "center"
      }}>
      <Badge
        count={
          <Button
            icon={<CloseCircleFilled className="icon-remove-button-icon" />}
            type="text"
            size="small"
            onClick={handelRemove}
          />
        }
      >
        <Button
          icon={<BorderOutlined style={{ color: "transparent" }} />}
          onClick={handleShow}
        />
      </Badge>
      <Modal
        title={t("IconInput.DialogTitle")}
        centered
        visible={visible}
        onOk={hancleClose}
        onCancel={hancleClose}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  )
})

export default IconInput;