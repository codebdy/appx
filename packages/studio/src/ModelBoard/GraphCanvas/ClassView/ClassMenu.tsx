import { DeleteOutlined, EyeInvisibleOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { getLocalMessage } from '../../../locales/getLocalMessage';
import React, { memo, useState } from 'react';
import { useCallback } from 'react';

const ClassMenu = memo((
  props: {
    onAddAttribute: () => void,
    onAddMethod: () => void,
    onHidden: () => void,
    onDelete: () => void,
  }
) => {
  const { onAddAttribute, onAddMethod, onHidden, onDelete } = props;
  const [visible, setVisible] = useState(false);

  const handleMenuClick = useCallback((e) => {
    if (e.key === 'addAttribute') {
      onAddAttribute();
    }
    if (e.key === 'addMethod') {
      onAddMethod();
    }
    if (e.key === 'hidden') {
      onHidden();
    }
    if (e.key === 'delete') {
      onDelete();
    }
  }, [onAddAttribute, onAddMethod, onHidden, onDelete]);

  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
  }, []);

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          icon: <PlusOutlined />,
          label: getLocalMessage("model.AddAttribute"),
          key: 'addAttribute',
        },
        {
          icon: <PlusOutlined />,
          label: getLocalMessage("model.AddMethod"),
          key: 'addMethod',
        },
        {
          icon: <EyeInvisibleOutlined />,
          label: getLocalMessage("Hidden"),
          key: 'hidden',
        },
        {
          icon: <DeleteOutlined />,
          label: getLocalMessage("Delete"),
          key: 'delete',
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <Button
        style={{
          position: "absolute",
          right: 0,
          top: "-4px",
        }}
        shape="circle"
        type="text"
        onClick={(e) => e.preventDefault()}
      >
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
});

export default ClassMenu;