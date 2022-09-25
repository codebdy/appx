import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { EditFrameDialog } from "./EditFrameDialog";

const CreateFrameDialog = memo(() => {
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
        {t("Templates.NewTemplate")}
      </Button>
      <EditFrameDialog isModalVisible={isModalVisible} onClose={handleClose} />
    </div>
  )
})

export default CreateFrameDialog;