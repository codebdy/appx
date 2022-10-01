import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import "./style.less";
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MenuOutlined } from '@ant-design/icons';
import { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from "array-move";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  index: number;
}

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />) as any;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

const SortableItem: any = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
const SortableBody: any = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));
export const ArgsInput = memo(() => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = useMemo(() => [
    {
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: t("Name"),
      dataIndex: 'name',
      className: 'drag-visible',
      render: (_, { name }) => (
        <Input value={name} />
      ),
    },
    {
      title: t("Type"),
      dataIndex: 'type',
      className: 'drag-visible',
      render: (_, { name }) => (
        <Input value={name} />
      ),
    },
    {
      dataIndex: 'operate',
      className: 'drag-visible',
      render: () => (
        <Button shape="circle" type="text" icon={<DeleteOutlined />} />
      ),
    },
  ], []);


  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
        (el: DataType) => !!el,
      );
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };


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
          <Table
            pagination={false}
            dataSource={dataSource}
            columns={columns}
            rowKey="index"
            components={{
              body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow,
              },
            }}
          />
          <Button type="dashed" block icon={<PlusOutlined />}>
            {t("Add")}
          </Button>
        </div>
      </Modal>
    </>
  )
})