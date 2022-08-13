import { FormOutlined } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import LangLabel from "./LangLabel";
import { langs } from "./langs";

const LangSelect = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
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
      <Button onClick={showModal}>
        <div>
          <Tag>中文</Tag>
          <Tag>English</Tag>
          <Tag>日本语</Tag>
          <FormOutlined style={{ marginLeft: 8 }} />
        </div>
      </Button>
      <Modal
        title={t("Config.MultiLang.LangsEdit")}
        className="lang-select-dialog"
        width={700}
        visible={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{
          display: "flex"
        }}>
          <div className="lang-list" style={{ marginRight: 8 }}>
            {
              langs.map((lang) => {
                return (
                  <LangLabel lang={lang} />
                )
              })
            }
          </div>
          <div className="lang-list" style={{ marginLeft: 8 }}>

          </div>
        </div>

      </Modal>
    </>
  )
})

export default LangSelect;