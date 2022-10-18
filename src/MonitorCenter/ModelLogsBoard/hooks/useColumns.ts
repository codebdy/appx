import { ColumnsType } from 'antd/es/table';
import { useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { IModelLog } from "../../../model/log";

export function useColumns() {
  const { t } = useTranslation();
  const columns: ColumnsType<IModelLog> = useMemo(() => [
    { title: t('Monitor.App'), dataIndex: 'appUuid', key: 'appUuid' },
    {
      title: t('Monitor.User'),
      dataIndex: 'user',
      key: 'user',
      render: (_, { user }) => user?.name,
    },
    { title: t('IP'), dataIndex: 'ip', key: 'ip' },
    { title: t('Monitor.Class'), dataIndex: 'className', key: 'className' },
    { title: t('Monitor.OperateType'), dataIndex: 'operateType', key: 'operateType' },
    { title: t('Monitor.OperateResult'), dataIndex: 'result', key: 'result' },
    {
      title: t('Monitor.DateTime'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ], [t]);

  return columns
}