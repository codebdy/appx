import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MakeVersionDialog } from './MakeVersionDialog';

enum OperateEnum {
  createVaresion = "createVaresion",
  export = "export",
  import = "import",
  publish = "publish"
}

export const Operate = memo(() => {
  const [makeVersionOpen, setMakeVersionOpen] = useState(false);

  const { t } = useTranslation();

  const handleMenuClick = useCallback(({ key }) => {

    if (key === OperateEnum.createVaresion) {
      setMakeVersionOpen(true)
    }
  }, [])

  const menu = useMemo(() => (
    <Menu
      onClick={handleMenuClick}
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

  const handleMakeVersionOpenChange = useCallback((open?: boolean) => {
    setMakeVersionOpen(open);
  }, [])

  return (
    <>
      <Dropdown overlay={menu}>
        <Button type="text" onClick={e => e.preventDefault()}>
          <Space>
            {t("Designer.Operate")}
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Button>
      </Dropdown>
      <MakeVersionDialog open={makeVersionOpen} onOpenChange={handleMakeVersionOpenChange} />
    </>
  )
});
