import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useImportApp } from '~/enthooks/hooks/useImportApp';
import { useShowError } from '~/hooks/useShowError';
import { ExportDialog } from './ExportDialog';
import { MakeVersionDialog } from './MakeVersionDialog';

enum OperateEnum {
  createVaresion = "createVaresion",
  export = "export",
  import = "import",
  publish = "publish"
}

export const Operate = memo(() => {
  const [makeVersionOpen, setMakeVersionOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [importApp, { error, loading }] = useImportApp(
    {
      onCompleted: (data) => {
        if (data?.importApp) {
          message.success(t("Designer.ImportSuccess"))
        } else {
          message.error(t("Designer.ImportFailed"))
        }
      }
    }
  );

  useShowError(error);

  const handleMenuClick = useCallback(({ key }) => {

    if (key === OperateEnum.createVaresion) {
      setMakeVersionOpen(true)
    } else if (key === OperateEnum.export) {
      setExportOpen(true)
    } else if (key === OperateEnum.import) {
      fileInputRef.current?.click()
    }
  }, [fileInputRef])

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

  const handleAppFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const zipFile = event.target.files
        ? event.target.files[0]
        : undefined;
      if (zipFile) {
        importApp(zipFile)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    },
    [importApp, fileInputRef]
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <Button type="text" onClick={e => e.preventDefault()} loading={loading}>
          <Space>
            {t("Designer.Operate")}
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Button>
      </Dropdown>
      <MakeVersionDialog open={makeVersionOpen} onOpenChange={handleMakeVersionOpenChange} />
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        style={{ display: "none" }}
        multiple={false}
        onChange={handleAppFileInputChange}
      />
    </>
  )
});
