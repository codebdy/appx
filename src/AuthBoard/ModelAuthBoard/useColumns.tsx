import { useTranslation } from "react-i18next";
import { ColumnsType } from 'antd/es/table';
import { useMemo } from "react";
import { Switch } from "antd";
import React from "react";
import { IAuthConfig, RowType } from "./IAuthConfig";

export function useColumns() {
  const { t } = useTranslation();
  const columns: ColumnsType<IAuthConfig> = useMemo(() => [
    {
      title: t("AppUml.Class"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Auth.Expand'),
      dataIndex: 'expand',
      key: 'expand',
      width: '12%',
      render: (_, { rowType }) => {
        return rowType === RowType.Class && <Switch size="small" />
      }
    },
    {
      title: t('Auth.Create'),
      dataIndex: 'create',
      key: 'create',
      width: '12%',
    },
    {
      title: t('Auth.Delete'),
      dataIndex: 'delete',
      key: 'delete',
      width: '12%',
    },
    {
      title: t('Auth.Read'),
      dataIndex: 'read',
      key: 'read',
      width: '12%',
    },
    {
      title: t('Auth.Update'),
      dataIndex: 'update',
      key: 'update',
      width: '12%',
    },
  ], []);

  return columns;
}