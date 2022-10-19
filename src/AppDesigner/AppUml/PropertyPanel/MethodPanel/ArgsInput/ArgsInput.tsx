import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select } from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import "./style.less";
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MenuOutlined } from '@ant-design/icons';
import { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from "array-move";
import { Type, Types } from "../../../meta/Type";
import { ArgMeta } from "../../../meta/MethodMeta";
import { createUuid } from "~/shared";
import { LazyInput } from "./LazyInput";
import { useGetTypeLabel } from "../../../hooks/useGetTypeLabel";
import { useEdittingAppUuid } from "~/hooks/useEdittingAppUuid";

const { Option } = Select;

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />) as any;

const SortableItem: any = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
const SortableBody: any = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));
export const ArgsInput = memo((
  props: {
    value?: ArgMeta[],
    onChange?: (value?: ArgMeta[]) => void,
  }
) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ArgMeta[]>([]);
  const appUuid = useEdittingAppUuid();
  const getTypeLabel = useGetTypeLabel(appUuid);

  const reset = useCallback(() => {
    setItems(value?.map((arg, index) => ({ ...arg, index })) || [])
  }, [value]);

  useEffect(() => {
    reset();
  }, [reset])

  const { t } = useTranslation();
  const handleNameChange = useCallback((uuid: string, name: string) => {
    setItems(items => {
      return items.map(item => {
        return item.uuid === uuid ? { ...item, name } : item
      })
    })
  }, [])
  const handleTypeChange = useCallback((uuid: string, type: Type) => {
    setItems(items => {
      return items.map(item => {
        return item.uuid === uuid
          ?
          {
            ...item,
            type,
            typeLabel: getTypeLabel(type),
          }
          : item
      })
    })
  }, [])

  const handleRemove = useCallback((uuid: string) => {
    setItems(items => items.filter(item => item.uuid !== uuid));
  }, [])

  const columns: ColumnsType<ArgMeta> = useMemo(() => [
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
      width: 200,
      render: (_, { uuid, name }) => (
        <LazyInput
          value={name}
          style={{ width: 200 }}
          onChange={
            (value) => handleNameChange(uuid, value)
          }
        />
      ),
    },
    {
      title: t("Type"),
      dataIndex: 'type',
      className: 'drag-visible',
      width: 150,
      render: (_, { uuid, type }) => (
        <Select
          style={{ width: 150 }}
          value={type}
          onChange={(value) => handleTypeChange(uuid, value)}
        >
          <Option value={Types.ID}>ID</Option>
          <Option value={Types.Int}>Int</Option>
          <Option value={Types.Float}>Float</Option>
          <Option value={Types.Boolean}>Boolean</Option>
          <Option value={Types.String}>String</Option>
          <Option value={Types.Date}>Date</Option>
          <Option value={Types.JSON}>JSON</Option>
          <Option value={Types.IDArray}>ID {t("AppUml.Array")}</Option>
          <Option value={Types.IntArray}>Int {t("AppUml.Array")}</Option>
          <Option value={Types.FloatArray}>Float {t("AppUml.Array")}</Option>
          <Option value={Types.StringArray}>String {t("AppUml.Array")}</Option>
          <Option value={Types.DateArray}>Date {t("AppUml.Array")}</Option>
        </Select>
      ),
    },
    {
      dataIndex: 'operate',
      className: 'drag-visible',
      render: (_, { uuid }) => (
        <Button
          shape="circle"
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(uuid)}
        />
      ),
    },
  ], []);


  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(items.slice(), oldIndex, newIndex).filter(
        (el: ArgMeta) => !!el,
      );
      setItems(newData);
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
    const index = items.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const handleAdd = useCallback(() => {
    setItems(items => {
      return [
        ...items,
        {
          uuid: createUuid(),
          name: "arg",
          type: Types.String,
          typeLabel: getTypeLabel(Types.String),
        }
      ]
    })
  }, [])

  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false);
    onChange && onChange(items);
  }, [onChange, items])

  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset])


  return (
    <>
      <Button block onClick={showModal}>
        {t("AppUml.ConfigArgs")}
      </Button>
      <Modal
        className="args-input-modal"
        title={t("AppUml.ConfigArgs")}
        width={600}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <div className="args-input-body">
          <Table
            pagination={false}
            dataSource={items}
            columns={columns}
            rowKey="index"
            components={{
              body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow,
              },
            }}
          />
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            {t("Add")}
          </Button>
        </div>
      </Modal>
    </>
  )
})