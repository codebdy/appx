import { FormOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { ILang } from "../../model";
import { useAppConfig } from "../../shared/AppRoot/context/config";
import LangLabel from "./LangLabel";
import { langs } from "./langs";

const LangSelect = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState<ILang[]>([]);
  const [changed, setChanged] = useState(false);
  const [keyword, setKeyWord] = useState("");
  const { t } = useTranslation();
  const appConfig = useAppConfig();

  useEffect(() => {
    setInputValue(appConfig?.schemaJson?.multiLang?.langs || [])
  }, [appConfig])

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  }, [])

  const allLangs = useMemo(() => {
    if (!keyword) {
      return langs;
    }

    return langs.filter((lang) => {
      const keywd = keyword.toLocaleLowerCase();
      return lang.key.toLocaleLowerCase().indexOf(keywd) > -1 ||
        t("Lang." + lang.key).toLocaleLowerCase().indexOf(keywd) > -1
    })
  }, [keyword, t])
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
    },
    [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          display: "flex",
          position: "relative"
        }}>
          <div className="lang-list" style={{ marginRight: 8, paddingTop: 56 }}>
            <div style={{
              width: 280,
              paddingTop: 16,
              paddingBottom: 8,
              position: "absolute",
              top: 1,
              left: 8,
              background: "#fff",
            }}>
              <Input.Search allowClear style={{ flex: 1, marginLeft: 8 }} onChange={handleKeywordChange} />
            </div>
            {
              allLangs?.map((lang) => {
                return (
                  <LangLabel lang={lang} />
                )
              })
            }
          </div>
          <div className="lang-list" style={{ marginLeft: 8 }}>
            {
              inputValue?.map((lang) => {
                return (
                  <LangLabel lang={lang} />
                )
              })
            }
          </div>
        </div>

      </Modal>
    </DragDropContext>
  )
})

export default LangSelect;