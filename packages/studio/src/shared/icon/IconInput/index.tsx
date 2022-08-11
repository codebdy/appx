import { BorderOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Badge, Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { IIcon } from "../model";
import { SvgStringIcon } from "../SvgStringIcon";
import IconSelectForm from "./IconSelectForm";
import "./style.less"

export const isEmpertyIcon = (icon?: IIcon) => {
  return !icon || (!icon.iconKey && !icon.svgString)
}

const empertyIcon = <BorderOutlined style={{ color: "transparent" }} />;

export const IconView = (
  props: {
    icon?: IIcon
  }
) => {
  const { icon } = props;
  if (isEmpertyIcon(icon)) {
    return empertyIcon
  }

  if (icon.iconKey) {
    return <icon.iconKey />
  }

  if (icon.svgString) {
    return <SvgStringIcon icon={icon.svgString} />
  }

  return empertyIcon;
}

const IconInput = memo((
  props: {
    value?: IIcon,
    onChange?: (event: { target: { value?: IIcon } }) => void,
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value);
  const [visible, setVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>();
  const [customizedIcon, setCustomizedIcon] = useState<string>();
  const { t } = useTranslation();

  const reset = useCallback(() => {
    setSelectedIcon(value?.iconKey)
    setCustomizedIcon(value?.svgString);
    setInputValue(value);
  }, [value])

  useEffect(() => {
    reset();
  }, [reset]);

  const handelRemove = useCallback(() => {
    setInputValue(undefined);
    onChange({ target: { value: undefined } });
  }, [onChange]);

  const handleShow = useCallback(() => {
    setVisible(true);
  }, [])

  const hancleClose = useCallback(() => {
    setVisible(false);
    reset()
  }, [reset])

  const handleConfirm = useCallback(() => {
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
          !isEmpertyIcon(inputValue) ?
            <Button
              icon={<CloseCircleFilled className="icon-remove-button-icon" />}
              type="text"
              size="small"
              onClick={handelRemove}
            />
            : 0
        }
      >
        <Button
          icon={
            <IconView icon={inputValue} />
          }
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
        onOk={handleConfirm}
        onCancel={hancleClose}
        width={800}
      >
        <IconSelectForm
          selectedIcon={selectedIcon}
          onSelected={setSelectedIcon}
          customizedIcon={customizedIcon}
          onChangeCustomizedIcon={setCustomizedIcon}
        />
      </Modal>
    </div>
  )
})

export default IconInput;