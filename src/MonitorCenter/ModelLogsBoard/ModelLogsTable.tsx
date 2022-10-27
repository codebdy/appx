import { Table } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useShowError } from '~/AppDesigner/hooks/useShowError';
import { useColumns } from './hooks/useColumns';
import { useQueryModelLogs } from './hooks/useQueryModelLogs';

export const ModelLogsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { logs, total, error, loading } = useQueryModelLogs((page - 1) * size, size);
  useShowError(error);
  const columns = useColumns()

  const data = useMemo(() => logs?.map(log => {
    return { ...log, key: log.id }
  }), [logs])

  const handleChange = useCallback((page, pageSize) => {
    if (pageSize !== size) {
      setPage(1);
    } else {
      setPage(page);
    }
    setSize(pageSize);
  }, [size])

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

