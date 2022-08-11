import { BorderOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Badge, Button, Modal } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import IconSelectForm from "./IconSelectForm";
import "./style.less"

const IconInput = memo(() => {
  const [visible, setVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>();
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
        className="icon-select-model"
        title={t("IconInput.DialogTitle")}
        centered
        visible={visible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={hancleClose}
        onCancel={hancleClose}
        width={800}
      >
        <IconSelectForm selectedIcon = {selectedIcon} onSelected={setSelectedIcon}/>
      </Modal>
    </div>
  )
})

export default IconInput;