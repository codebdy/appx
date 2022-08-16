import { Button, Modal } from "antd";
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MonacoInput } from '@designable/react-settings-form'
import "./style.less"
import { useGetPackageEntities, usePackages } from "../../../datasource/hooks";

const DataSourceInput = memo((
  props: {

  }
) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const packages = usePackages();
  const getPackageEntities = useGetPackageEntities();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Button
        block
        onClick={showModal}
      >
        {t("SettingsForm.ConfigDataSource")}
      </Button>
      <Modal
        title={t("SettingsForm.ConfigDataSource")}
        className="config-datasource-modal"
        width={700}
        visible={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="form-pannel">
          <div className="expresion-input">
            <MonacoInput
              //{...props}
              options={{
                readOnly: false,
                //glyphMargin: false,
                folding: false,
                //lineNumbers: "off",
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                minimap: {
                  enabled: false,
                }
              }}
              //value={transformToMarkupSchemaCode(props.tree)}
              language="sql"
            />
          </div>
        </div>


      </Modal>
    </>
  )
})

export default DataSourceInput;