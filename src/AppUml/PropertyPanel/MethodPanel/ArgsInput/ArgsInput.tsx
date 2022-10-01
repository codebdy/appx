import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd"
import React, { useCallback, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import "./style.less";
import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

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
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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

export const ArgsInput = memo(() => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false);
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [])
  return (
    <>
      <Button block onClick={showModal}>
        {t("AppUml.ConfigArgs")}
      </Button>
      <Modal
        className="args-input-modal"
        title={t("AppUml.ConfigArgs")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <div className="args-input-body">
          <Table columns={columns} dataSource={data} />
          <Button type="dashed" block icon={<PlusOutlined />}>
            {t("Add")}
          </Button>
        </div>
      </Modal>
    </>
  )
})