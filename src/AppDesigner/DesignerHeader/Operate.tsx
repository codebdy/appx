import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

enum OperateEnum{
  createVaresion = 1,
  export, 
  import,
  publish
}

export const Operate = memo(() => {

  const { t } = useTranslation();
  const menu = useMemo(() => (
    <Menu
      items={[
        {
          key: OperateEnum.createVaresion,
          label: t("Designer.CreateVersion"),
        },
        {
          key: OperateEnum.export,
          label: t("Designer.Export"),
        },
        {
          key: OperateEnum.import,
          label: t("Designer.Import"),
        },
        {
          key: OperateEnum.publish,
          label: t("Designer.Publish"),
        },
      ]}
    />
  ), [t]);

  return (
    <Dropdown overlay={menu}>
      <Button type="text" onClick={e => e.preventDefault()}>
        <Space>
          {t("Designer.Operate")}
          <DownOutlined style={{ fontSize: 12 }} />
        </Space>
      </Button>
    </Dropdown>
  )
});
