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
    setVisible(false);
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
    <Dropdown
      trigger={["click"]}
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <div
        style={{
          position: "absolute",
          right: "-16px",
          top: "-4px",
          paddingRight: "16px",
        }}
      >
        <Button
          shape="circle"
          type="text"
          onClick={(e) => e.preventDefault()}
        >
          <MenuOutlined />
        </Button>
      </div>

    </Dropdown>
  );
});

export default ClassMenu;