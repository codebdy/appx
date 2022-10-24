import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Operate = memo(() => {

  const { t } = useTranslation();
  const menu = useMemo(() => (
    <Menu
      items={[
        {
          key: '1',
          label: t("Designer.CreateVersion"),
        },
        {
          key: '2',
          label: t("Designer.Export"),
        },
        {
          key: '3',
          label: t("Designer.Import"),
        },
        {
          key: '4',
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
