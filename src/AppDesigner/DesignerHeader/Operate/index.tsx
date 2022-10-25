import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExportDialog } from './ExportDialog';
import { MakeVersionDialog } from './MakeVersionDialog';

export const pickerTypes = [
  {
    description: "zip files",
    accept: {
      "text/zip": [".zip"],
    },
  },
];

const pickerOpts = {
  types: pickerTypes,
  excludeAcceptAllOption: false,
  multiple: false,
};

let fileHandle;

async function getTheFile() {
  // open file picker
  [fileHandle] = await (window as any).showOpenFilePicker(pickerOpts);

  // get file contents
  return fileHandle;
}

enum OperateEnum {
  createVaresion = "createVaresion",
  export = "export",
  import = "import",
  publish = "publish"
}

export const Operate = memo(() => {
  const [makeVersionOpen, setMakeVersionOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const { t } = useTranslation();

  const handleMenuClick = useCallback(({ key }) => {

    if (key === OperateEnum.createVaresion) {
      setMakeVersionOpen(true)
    } else if (key === OperateEnum.export) {
      setExportOpen(true)
    } else if (key === OperateEnum.import) {
      getTheFile()
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
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </>
  )
});
