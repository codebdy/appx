import { useTranslation } from "react-i18next";
import { ColumnsType } from 'antd/es/table';
import { useMemo } from "react";
import React from "react";
import { ID } from "../../shared";
import { IUiAuthRow } from "../IUiAuthConfig";


export function useColumns(roleId: ID) {
  const { t } = useTranslation();
  const columns: ColumnsType<IUiAuthRow> = useMemo(() => [
    {
      title: t("Auth.MenuItem"),
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: t('Auth.Permit'),
      dataIndex: 'permit',
      key: 'permit',
      width: '12%',
    },
    {
      title: "",
      dataIndex: 'blank',
      key: 'blank',
    },

  ], [roleId]);

  return columns;
}