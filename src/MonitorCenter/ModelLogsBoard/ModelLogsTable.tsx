import { Table } from 'antd';
import React, { useMemo } from 'react';
import { useShowError } from '../../hooks/useShowError';
import { useColumns } from './hooks/useColumns';
import { useQueryModelLogs } from './hooks/useQueryModelLogs';

export const ModelLogsTable: React.FC = () => {
  const { logs, total, error, loading } = useQueryModelLogs();
  useShowError(error);
  const columns = useColumns()

  const data = useMemo(() => logs?.map(log => {
    return { ...log, key: log.id }
  }), [logs])

  return (<Table
    loading={loading}
    columns={columns}
    expandable={{
      expandedRowRender: record => <>
        {record.message && <p>{record.message}</p>}
        <p style={{ margin: 0 }}>{record.gql}</p>
      </>
      ,
    }}
    dataSource={data || []}
  />
  );
}

