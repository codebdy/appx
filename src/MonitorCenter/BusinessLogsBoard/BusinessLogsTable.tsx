import { Table } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useShowError } from '~/hooks/useShowError';
import { useColumns } from './hooks/useColumns';
import { useQueryBusinessLogs } from './hooks/useQueryBusinessLogs';

export const BusinessLogsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { logs, total, error, loading } = useQueryBusinessLogs((page - 1) * size, size);
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
    dataSource={data || []}
  />
  );
}

