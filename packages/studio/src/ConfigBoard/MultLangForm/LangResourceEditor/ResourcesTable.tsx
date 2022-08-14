import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useAppConfig, useAppParams } from '../../../shared/AppRoot/context';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ILangLocalInput } from '../../../model/input';
import LangLocalEditDialog from './LangLocalEditDialog';


const ResourcesTable = memo(() => {
  const [keyword, setKeyWord] = useState("");
  const [editingLocal, setEditingLocal] = useState<ILangLocalInput>();
  const { t } = useTranslation();
  const appConfig = useAppConfig();
  const { langLocales } = useAppParams();
  const columns = useMemo(() => {
    const cols: any[] = [
      {
        title: t('Name'),
        dataIndex: 'name',
        key: 'name',
      },
    ];

    appConfig?.schemaJson?.multiLang?.langs?.forEach((lang, index) => {
      if (index < 3) {
        cols.push({
          title: t("Lang." + lang.key),
          dataIndex: lang.key,
          key: lang.key,
        })
      }
    })

    cols.push({
      title: t('Operation'),
      key: 'operation',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button type="link">
            {t("Edit")}
          </Button>
          <Button type="link">
            {
              t("Delete")
            }
          </Button>
        </Space>
      ),
    })

    return cols;
  }, [appConfig?.schemaJson?.multiLang?.langs, t])
  const data = useMemo(() => {
    return langLocales?.map((langLocal => {
      return {
        key: langLocal.id,
        name: langLocal.name,
        ...langLocal.schemaJson
      }
    }))
  }, [langLocales])

  const handleKeywordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  }, [])

  const handleClose = useCallback(() => {
    setEditingLocal(undefined);
  }, [])

  const handleNew = useCallback(() => {
    setEditingLocal({});
  }, [])

  return (
    <>
      <Table
        className="lang-resource-table"
        title={() => {
          return (
            <div className='table-toolbar'>
              <Input.Search className='search-input' allowClear onChange={handleKeywordChange} />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleNew}>{t("New")}</Button>
            </div>
          )
        }}
        scroll={{ y: 240, x: 500 }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <LangLocalEditDialog langLocal={editingLocal} onClose={handleClose} />
    </>
  )
});

export default ResourcesTable;