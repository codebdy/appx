import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { IMaterialTab } from '../../../../../material-sdk/model';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabDragableLabel from './TabDragableLabel';
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
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAdd = useCallback(() => {
    setItems(items => [...items, {
      title: "Tab",
      uuid: createUuid(),
      collopsesItems: [],
    }])
  }, []);
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      // if (destination?.droppableId) {
      //   var draggedNode: IAppxAction;
      //   if (source.droppableId === DATA_ACTIONS_LIST || source.droppableId === UI_ACTIONS_LIST) {
      //     draggedNode = {
      //       uuid: createUuid(),
      //       actionType: draggableId as any,
      //       title: t("Action." + draggableId),
      //     };

      //     draggedNode.payload = {}
      //     if (draggableId === ActionType.OpenPage) {
      //       draggedNode.payload = {
      //         openType: OpenPageType.RouteTo,
      //       }
      //     }

      //   } else {
      //     draggedNode = actions.find(action => action.uuid === draggableId);
      //   }

      //   if (draggedNode) {
      //     insertAt(draggedNode, destination.index);
      //     setSelectedUuid(draggedNode.uuid);
      //   }
      // }
    },
    []
  )

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
