import React, { useCallback, useState } from 'react'
import {
  observer,
} from '@formily/react'
import { Button, Divider, Empty, Modal, Space } from 'antd';
import { TextWidget } from '@designable/react';
import "./style.less"
import { ToolCollapse } from './ToolCollapse';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const ActionInput = observer((props: {}) => {
  //const tabs = useTabs()
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
            <div className='toolbar bottom-border'>工具箱</div>
            <div style={{ overflow: "auto" }}>
              <ToolCollapse />
            </div>
          </div>
          <div className="main-area block-area right-border">
            <div className='toolbar bottom-border'>
              <Space>
                <Button shape='circle' type='text' size='small' icon={<UndoOutlined />} />
                <Button shape='circle' type='text' size='small' disabled icon={<RedoOutlined />} />
                <Divider type="vertical" />
                <Button shape='circle' type='text' size='small' disabled icon={<DeleteOutlined />} />
              </Space>
            </div>
            <div></div>
          </div>
          <div className='property-box block-area'>
            <div className='toolbar bottom-border'>属性</div>
            <div>
              <Empty />
            </div>
          </div>
        </div>
      </Modal>
    </DragDropContext>
  )
}) 
