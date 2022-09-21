import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { IMaterialTab } from '@appx/plugin-sdk';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabDragableLabel } from './TabDragableLabel';
import { createUuid } from '../../../../../shared';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const TABS_ID = "TABS_ID";

export const TabsEditDialog = memo((
  props: {
    tabs: IMaterialTab[],
    onTabsChange: (tabs: IMaterialTab[]) => void,
  }
) => {
  const { tabs, onTabsChange } = props;
  const [items, setItems] = useState(tabs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setItems(tabs);
  }, [tabs])

  const handleShowModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    onTabsChange(items)
    setIsModalOpen(false);
  }, [items, onTabsChange]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setItems(tabs);
  }, [tabs]);

  const insertAt = useCallback((item: IMaterialTab, index: number) => {
    const newItems = items.filter(itm => itm.uuid !== item.uuid)
    newItems.splice(index, 0, item);
    setItems(newItems);
  }, [items])


  const handleAdd = useCallback(() => {
    setItems(items => [...items, {
      title: "Tab",
      uuid: createUuid(),
      collopsesItems: [],
    }])
  }, []);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, draggableId } = result;
      if (destination?.droppableId) {
        var draggedNode: IMaterialTab;

        draggedNode = items.find(action => action.uuid === draggableId);

        if (draggedNode) {
          insertAt(draggedNode, destination.index);
        }
      }
    },
    [insertAt, items]
  )

  const handleTabChange = useCallback((tab: IMaterialTab) => {
    setItems(items => items.map(item => item.uuid === tab.uuid ? tab : item))
  }, []);

  const handleRemove = useCallback((uuid: string) => {
    setItems(items => items.filter(item => item.uuid !== uuid))
  }, []);

  return (
    <>
      <Button size='small'
        type="text"
        shape='circle'
        icon={<EditOutlined />}
        style={{ marginRight: 8 }}
        onClick={handleShowModal}
      />
      <Modal
        title={t("Materials.TabsEdit")}
        width={400}
        className="material-tabs-edits-modal"
        open={isModalOpen}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='tabs-edit-content'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={TABS_ID} >
              {(provided, snapshot) => (
                <div className="tabs-view"
                  ref={provided.innerRef}
                  style={{
                    flex: 1,
                    flexFlow: "column",
                    backgroundColor: snapshot.isDraggingOver
                      ? "rgba(0,0,0, 0.05)"
                      : undefined,
                  }}
                >
                  {items?.map((item, index) => {
                    return (
                      <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                        {(provided, snapshot) => (
                          <TabDragableLabel
                            tab={item}
                            //className={selectedId === item.uuid ? "selected" : undefined}
                            //onSelect={onSelect}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            float={snapshot.isDragging}
                            ref={provided.innerRef}
                            onChange={handleTabChange}
                            onRemove={handleRemove}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            type='dashed'
            block
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            {t("Materials.Add")}
          </Button>
        </div>
      </Modal>
    </>
  );
});
