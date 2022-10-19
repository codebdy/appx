import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { IBusinessLog, ModelOperateType, OperateResult } from "../../../model/log";
import { useGetAppName } from '../../hooks/useGetAppName';
import moment from 'moment'

export function useColumns() {
  const { t } = useTranslation();
  const getAppName = useGetAppName();
  const columns: ColumnsType<IBusinessLog> = useMemo(() => [
    {
      title:
        t('Monitor.App'),
      dataIndex: 'appUuid',
      key: 'appUuid',
      render: (_, { appUuid }) => getAppName(appUuid),
    },
    {
      title: t('Monitor.User'),
      dataIndex: 'user',
      key: 'user',
      render: (_, { user }) => user?.name,
    },
    { title: t('IP'), dataIndex: 'ip', key: 'ip' },
    {
      title: t('Monitor.OperateType'),
      dataIndex: 'operateType',
      key: 'operateType',
      render: (_, { operateType }) => {
        return <>
          {
            operateType === ModelOperateType.query &&
            t("Monitor.Query")
          }
          {
            operateType === ModelOperateType.upsert &&
            t("Monitor.Upsert")
          }
          {
            operateType === ModelOperateType.delete &&
            t("Monitor.Delete")
          }
        </>
      },
    },
    {
      title: t('Monitor.OperateResult'),
      dataIndex: 'result',
      key: 'result',
      render: (_, { result }) => {
        return <>
          {
            result === OperateResult.success &&
            <Tag color="green">{t("Monitor.Success")}</Tag>
          }
          {
            result === OperateResult.failure &&
            <Tag color="red">{t("Monitor.Failure")}</Tag>
          }
        </>
      },
    },
    { title: t('Monitor.Message'), dataIndex: 'message', key: 'message' },
    {
      title: t('Monitor.DateTime'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => moment(createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
  ], [t, getAppName]);

  return columns
}