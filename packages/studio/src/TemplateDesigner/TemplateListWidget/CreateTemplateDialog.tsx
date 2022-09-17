import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { EditTemplateDialog } from "./EditTemplateDialog";

const CreatePageDialog = memo(() => {
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
        type='dashed'
        icon={
          <PlusOutlined />
        }
        block
        onClick={showModal}
      >
        {t("Templates.NewTemplate")}
      </Button>
      <EditTemplateDialog isModalVisible={isModalVisible} onClose={handleClose} />
    </>
  )
})

export default CreatePageDialog;