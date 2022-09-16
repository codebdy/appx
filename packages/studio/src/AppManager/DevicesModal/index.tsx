import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useCallback } from "react"
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

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

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
          {t("Devices.Add")}
        </Button>
      </div>
    </Modal>
  )
})