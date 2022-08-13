import { FormOutlined } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";

const LangSelect = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
})

export default LangSelect;