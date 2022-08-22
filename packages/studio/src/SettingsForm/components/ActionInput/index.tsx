import React, { useCallback, useEffect, useState } from 'react'
import {
  observer,
} from '@formily/react'
import { Button, Divider, Empty, Modal, Space } from 'antd';
import { TextWidget } from '@designable/react';
import "./style.less"
import { ToolCollapse } from './ToolCollapse';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { ActionsView } from './ActionsView';
import { IAction } from '@formily/reactive';

export interface IActionsSnapshot {
  actions: IAction[],
  selectedUuid?: string,
}

export const ActionInput = observer((props: {
  value?: IAction[],
  onChange?: (actions: IAction) => void
}) => {
  const { value, onChange } = props;
  const [actions, setActions] = useState<IAction[]>([]);
  const [selectedUuid, setSelectedUuid] = useState<string>();
  const [undoList, setUndoList] = useState<IActionsSnapshot[]>([]);
  const [redoList, setRedoList] = useState<IActionsSnapshot[]>([]);

  useEffect(() => {
    setActions(value || [])
  }, [value])

  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
    },
    []
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Button
        block
        onClick={showModal}
      >
        <TextWidget token="SettingComponents.ActionInput.Title" />
      </Button>
      <Modal
        title={<TextWidget token="SettingComponents.ActionInput.Title" />}
        className="config-action-modal"
        width={900}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={<TextWidget token="SettingComponents.ActionInput.Confirm" />}
        cancelText={<TextWidget token="SettingComponents.ActionInput.Cancel" />}
      >
        <div className='action-input-model-content'>
          <div className="toolbox block-area right-border">
            <div className='toolbar bottom-border'>{t("Action.Toolbox")}</div>
            <div style={{ overflow: "auto" }}>
              <ToolCollapse />
            </div>
          </div>
          <div className="main-area block-area right-border">
            <div className='toolbar bottom-border'>
              <Space>
                <Button
                  shape='circle'
                  type='text'
                  size='small'
                  disabled={undoList.length === 0}
                  icon={<UndoOutlined />}
                />
                <Button
                  shape='circle'
                  type='text' size='small'
                  disabled={redoList.length === 0}
                  icon={<RedoOutlined />}
                />
                <Divider type="vertical" />
                <Button
                  shape='circle'
                  type='text'
                  size='small'
                  disabled={!selectedUuid}
                  icon={<DeleteOutlined />}
                />
              </Space>
            </div>
            <div style={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              overflow: "auto"
            }}>
              <ActionsView />
            </div>
          </div>
          <div className='property-box block-area'>
            <div className='toolbar bottom-border'>{t("Action.Properties")}</div>
            <div style={{ padding: 16, overflow: "auto" }}>
              <Empty />
            </div>
          </div>
        </div>
      </Modal>
    </DragDropContext>
  )
}) 
