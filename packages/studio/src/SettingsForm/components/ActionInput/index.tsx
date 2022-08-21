import React, { useCallback, useState } from 'react'
import {
  observer,
} from '@formily/react'
import { Button, Modal } from 'antd';
import { TextWidget } from '@designable/react';
import "./style.less"

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

  return (
    <>
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
            
          </div>
          <div className="main-area block-area right-border">
            <div className='toolbar bottom-border'>操作区</div>
            <div></div>
          </div>
          <div className='property-box block-area'>
            <div className='toolbar bottom-border'>属性</div>
            <div></div>
          </div>
        </div>
      </Modal>
    </>
  )
}) 
