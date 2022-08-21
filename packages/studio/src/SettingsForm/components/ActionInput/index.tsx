import React, { useCallback, useState } from 'react'
import {
  observer,
} from '@formily/react'
import { Button } from 'antd';
import { TextWidget } from '@designable/react';

export const ActionInput = observer((props: {}) => {
  //const tabs = useTabs()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  return (
    <>
      <Button
        block
        onClick={showModal}
      >
        <TextWidget token="SettingComponents.ActionInput.Title" />
      </Button>
    </>
  )
}) 
