import { FormOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tag } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { ILang } from "../../model";
import { useAppConfig } from "../../shared/AppRoot/context/config";
import LangLabel from "./LangLabel";
import { langs } from "./langs";

const ALL_LANGS_ID = "ALL_LANGS_ID";
const SELECTED_LANGS_ID = "SELECTED_LANGS_ID";

const LangSelect = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState<ILang[]>([]);
  const [changed, setChanged] = useState(false);
  const [keyword, setKeyWord] = useState("");
  const { t } = useTranslation();
  const appConfig = useAppConfig();
  const getLang = useCallback((key) => {
    return langs.find(lang => lang.key === key)
  }, [])

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
      if (destination?.droppableId) {
        const lang = getLang(draggableId)
        if(lang){
          setInputValue(inputValue => [...inputValue, lang])
        }
        
      }
    },
    [getLang])

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
        }}>
          <div style={{ marginRight: 8 }}>
            <div style={{
              width: 280,
              paddingBottom: 8,
              background: "#fff",
            }}>
              <Input.Search allowClear style={{ flex: 1 }} onChange={handleKeywordChange} />
            </div>
            <div className="all-lang-list">
              <Droppable droppableId={ALL_LANGS_ID} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    {allLangs?.map((lang, index) => {
                      return (
                        <Draggable key={lang.key} draggableId={lang.key} index={index}>
                          {(provided, snapshot) => (
                            <>
                              <LangLabel
                                lang={lang}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                float={snapshot.isDragging}
                                ref={provided.innerRef}
                              />
                              {snapshot.isDragging && (
                                <LangLabel
                                  lang={lang}
                                  fixed
                                />
                              )}
                            </>
                          )}
                        </Draggable>
                      );
                    })}
                    <div style={{ display: "none" }}>{provided.placeholder}</div>
                  </div>
                )}
              </Droppable>
            </div>

          </div>
          <div className="lang-list" style={{ marginLeft: 8 }}>
            <Droppable droppableId={SELECTED_LANGS_ID} isDropDisabled={false}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}
                  style={{
                    flex: 1,
                    height: "100%",
                    flexFlow: "column",
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(0,0,0, 0.05)"
                      : undefined,
                  }}
                >
                  {inputValue?.map((lang, index) => {
                    return (
                      <Draggable key={lang.key} draggableId={lang.key} index={index}>
                        {(provided, snapshot) => (
                          <>
                            <LangLabel
                              lang={lang}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              float={snapshot.isDragging}
                              ref={provided.innerRef}
                            />
                            {snapshot.isDragging && (
                              <LangLabel
                                lang={lang}
                                fixed
                              />
                            )}
                          </>
                        )}
                      </Draggable>
                    );
                  })}
                  <div style={{ display: "none" }}>{provided.placeholder}</div>
                </div>
              )}
            </Droppable>
          </div>
        </div>

      </Modal>
    </DragDropContext>
  )
})

export default LangSelect;