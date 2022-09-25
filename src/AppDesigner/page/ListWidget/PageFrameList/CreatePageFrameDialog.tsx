import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { EditPageFrameDialog } from "./EditPageFrameDialog";

const CreatePageFrameDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Button
        type='text'
        shape="circle"
        size="small"
        icon={
          <PlusOutlined />
        }
        block
        onClick={showModal}
      />
      <EditPageFrameDialog isModalVisible={isModalVisible} onClose={handleClose} />
    </>
  )
})

export default CreatePageFrameDialog;