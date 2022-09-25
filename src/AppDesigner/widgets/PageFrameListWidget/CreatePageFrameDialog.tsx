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
    <div className="template-list-action">
      <Button
        type='dashed'
        icon={
          <PlusOutlined />
        }
        block
        onClick={showModal}
      >
        {t("PageFrames.NewPageFrame")}
      </Button>
      <EditPageFrameDialog isModalVisible={isModalVisible} onClose={handleClose} />
    </div>
  )
})

export default CreatePageFrameDialog;