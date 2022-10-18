import { Table } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useShowError } from '../../hooks/useShowError';
import { useColumns } from './hooks/useColumns';
import { useQueryModelLogs } from './hooks/useQueryModelLogs';

export const ModelLogsTable: React.FC = () => {
  const [size, setSize] = useState(20);
  const { logs, total, error, loading } = useQueryModelLogs(size);
  useShowError(error);
  const columns = useColumns()

  const data = useMemo(() => logs?.map(log => {
    return { ...log, key: log.id }
  }), [logs])

  const handleChange = useCallback((page, pageSize) => {
    setSize(pageSize);
  }, [])

  return (<Table
    loading={loading}
    columns={columns}
    pagination={{
      pageSize: size,
      total: total,
      onChange: handleChange,
    }}
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

