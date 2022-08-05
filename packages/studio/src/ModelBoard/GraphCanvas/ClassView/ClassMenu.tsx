import { DeleteOutlined, EyeInvisibleOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { memo, useState } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ClassMeta, StereoType } from '../../meta/ClassMeta';

const ClassMenu = memo((
  props: {
    cls: ClassMeta,
    onAddAttribute: () => void,
    onAddMethod: () => void,
    onHidden: () => void,
    onDelete: () => void,
    onVisible: (visible: boolean) => void,
  }
) => {
  const { cls, onAddAttribute, onAddMethod, onHidden, onDelete, onVisible } = props;
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  
  const handleMenuClick = useCallback((e) => {
    setVisible(false);
    onVisible(false);
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
  }, [onVisible, onAddAttribute, onAddMethod, onHidden, onDelete]);

  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
    onVisible(flag);
  }, [onVisible]);

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          icon: <PlusOutlined />,
          label: t("model.AddAttribute"),
          key: 'addAttribute',
          disabled: cls.stereoType === StereoType.Service,
        },
        {
          icon: <PlusOutlined />,
          label: t("model.AddMethod"),
          key: 'addMethod',
          disabled: cls.stereoType === StereoType.Enum || cls.stereoType === StereoType.ValueObject,
        },
        {
          icon: <EyeInvisibleOutlined />,
          label: t("Hidden"),
          key: 'hidden',
        },
        {
          icon: <DeleteOutlined />,
          label: t("Delete"),
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