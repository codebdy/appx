/* eslint-disable jsx-a11y/anchor-is-valid */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import "./style.less";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const DevicesModal = memo((
  props: {
    visible?: boolean,
    onClose?: () => void,
  }
) => {
  const { visible, onClose } = props;
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = useMemo(() => [
    {
      title: '',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: text => <a>{text}</a>,
    },
    {
      title: t('Devices.Key'),
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('Operation'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>{}}>编辑</a>
          <a onClick={()=>{}}>删除</a>
        </Space>
      ),
    },
  ], [t]);

  const handleCancel = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  return (
    <Modal
      title={t("System.Devices")}
      className="devices-modal"
      visible={visible}
      width={700}
      onCancel={handleCancel}
      footer={null}
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
      />
      <div
        style={{ padding: "8px 16px" }}
      >
        <Button
          block
          type="dashed"
          icon={
            <PlusOutlined />
          }
        >
          {t("Add")}
        </Button>
      </div>
    </Modal>
  )
})