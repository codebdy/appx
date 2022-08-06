import { DeleteOutlined, EditOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import React, { useCallback, useEffect, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import "./index.less"
import { UploadDialog } from './UploadDialog';
import { MaterialModule } from './model';
import { materialStore } from './global';

const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: 'grab',
      color: '#999',
    }}
  />
));
const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'name',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    className: 'action',
    key: 'x',
    render: () => <>
      <Button className="action-btn" icon={<EditOutlined />}></Button>
      <Button className="action-btn" icon={<DeleteOutlined />}></Button>
    </>,
  },
];
const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

export const MaterialDialogTable = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(()=>{
    setDataSource(materialStore.modules.map((material,index)=>{
      return {
        key: index,
        name: material.name,
        index: index,
      }
    }))
  }, [materialStore.modules])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
        (el) => !!el,
      );
      console.log('Sorted items: ', newData);
      setDataSource(newData);
    }
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };


  const handleAdded = useCallback((module: MaterialModule) => {

  }, [])

  return (
    <>
      <Table
        className='material-table'
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        showHeader={false}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
      <UploadDialog onAdded={handleAdded} />
    </>
  );
};
