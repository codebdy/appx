import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialTabs } from './MaterialTabs';
import "./style.less";
import { IMaterialTab } from '../../../../plugin-sdk/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { PluginList } from './PluginList';

export const MaterialDialog = memo(() => {
  const [tabs, setTabs] = useState<IMaterialTab[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleTabsChange = useCallback((tabs: IMaterialTab[]) => {
    setTabs(tabs);
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      // if (destination?.droppableId) {
      //   let draggedNode: IMenuNode | undefined;
      //   if (draggableId === COLLAPSE_GROUP_ID) {
      //     draggedNode = {
      //       meta: {
      //         uuid: createUuid(),
      //         type: MenuItemType.Group,
      //         title: t("Menu.CollapseGroup"),
      //       },
      //       childIds: [],
      //     };
      //   } else if (draggableId === DIVIDER_ID) {
      //     draggedNode = {
      //       meta: {
      //         uuid: createUuid(),
      //         type: MenuItemType.Divider,
      //         title: t("Menu.Divider"),
      //       },
      //       childIds: [],
      //     };
      //   } else if (draggableId === CUSTOMIZED_LINK_ID) {
      //     draggedNode = {
      //       meta: {
      //         uuid: createUuid(),
      //         type: MenuItemType.Link,
      //         title: t("Menu.CustomizedLink"),
      //       },
      //       childIds: [],
      //     };
      //   } else if (source.droppableId.startsWith(PAGE_LIST_ID)) {
      //     const page: IPage | undefined = getPage(draggableId);
      //     if (page) {
      //       draggedNode = {
      //         meta: {
      //           uuid: createUuid(),
      //           type: MenuItemType.Item,
      //           title: page.title,
      //           route: { pageId: page.id },
      //         },
      //         childIds: [],
      //       };
      //     }
      //   } else {
      //     draggedNode = getNode(draggableId);
      //   }

      //   if (draggedNode) {
      //     insertAt(draggedNode, destination?.droppableId, destination.index);
      //   }
      // }
    },
    []
  );

  return (
    <>
      <Button shape="circle" type="text" onClick={showModal}
        icon={<SettingOutlined style={{ fontSize: 14 }} />}
      />

      <Modal
        title={t("Materials.ModuleList")}
        className='material-module-modal'
        width={680}
        open={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='material-dialog-content'>
            <div className='material-dialog-tabs right-border'>
              <MaterialTabs tabs={tabs} onTabsChange={handleTabsChange} />
            </div>
            <div className="material-dialog-plugins">
              <div className='content-title bottom-border'>
                <span>{t("Materials.ComponentsForChoose")}</span>
              </div>
              <div className='content'>
                <PluginList />
              </div>
            </div>
          </div>
        </DragDropContext>
      </Modal>
    </>
  );
})