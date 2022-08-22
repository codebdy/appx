import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  observer,
} from '@formily/react'
import { Button, Divider, Empty, Modal, Space } from 'antd';
import { TextWidget } from '@designable/react';
import "./style.less"
import { DATA_ACTIONS_LIST, ToolCollapse, UI_ACTIONS_LIST } from './ToolCollapse';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { ActionsView } from './ActionsView';
import { IAppxAction } from '../../../../shared/action/model';
import { createUuid } from '../../../../shared';
import { ActionPropertyBox } from './ActionPropertyBox';

export interface IActionsSnapshot {
  actions: IAppxAction[],
  selectedUuid?: string,
}

export const ActionInput = observer((props: {
  value?: IAppxAction[],
  onChange?: (actions: IAppxAction[]) => void
}) => {
  const { value, onChange } = props;
  const [actions, setActions] = useState<IAppxAction[]>([]);
  const [selectedUuid, setSelectedUuid] = useState<string>();
  const [undoList, setUndoList] = useState<IActionsSnapshot[]>([]);
  const [redoList, setRedoList] = useState<IActionsSnapshot[]>([]);

  const backup = useCallback(() => {
    setRedoList([])
    setUndoList(list => [...list, { actions, selectedUuid }])
  },
    [actions, selectedUuid]
  )

  useEffect(() => {
    setActions(value || [])
  }, [value])

  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    onChange && onChange(actions);
    setIsModalVisible(false);
  }, [actions, onChange]);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const insertAt = useCallback((action: IAppxAction, index: number) => {
    backup();
    const newActions = actions.filter(act => act.uuid !== action.uuid)
    newActions.splice(index, 0, action);
    setActions(newActions);
  }, [actions, backup])

  const remove = useCallback(() => {
    backup();
    setActions(actions => actions.filter(action => action.uuid !== selectedUuid))
    setSelectedUuid(undefined);
  }, [backup, selectedUuid])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (destination?.droppableId) {
        var draggedNode: IAppxAction;
        if (source.droppableId === DATA_ACTIONS_LIST || source.droppableId === UI_ACTIONS_LIST) {
          draggedNode = {
            uuid: createUuid(),
            actionType: draggableId as any,
            title: t("Action." + draggableId),
          };
        } else {
          draggedNode = actions.find(action => action.uuid === draggableId);
        }

        if (draggedNode) {
          insertAt(draggedNode, destination.index);
          setSelectedUuid(draggedNode.uuid);
        }
      }
    },
    [actions, insertAt, t]
  )

  const handleSelect = useCallback((selectedId: string) => {
    setSelectedUuid(selectedId)
  }, [])

  const selectedAction = useMemo(() => {
    return actions.find(action => action.uuid === selectedUuid)
  }, [actions, selectedUuid])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
                  onClick={remove}
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
              <ActionsView
                actions={actions}
                selectedId={selectedUuid}
                onSelect={handleSelect}
              />
            </div>
          </div>
          <div className='property-box block-area'>
            <div className='toolbar bottom-border'>{t("Action.Properties")}</div>
            <div style={{ padding: 16, overflow: "auto" }}>
              {
                selectedUuid
                  ?
                  <ActionPropertyBox action={selectedAction} />
                  :
                  <Empty />
              }
            </div>
          </div>
        </div>
      </Modal>
    </DragDropContext>
  )
}) 
