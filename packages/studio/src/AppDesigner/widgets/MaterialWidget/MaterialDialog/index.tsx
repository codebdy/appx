import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialTabs } from './MaterialTabs';
import "./style.less";
import { IMaterialCollapseItem, IMaterialTab } from '../../../../plugin-sdk/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { PluginList, PLUGINS_LIST_ID } from './PluginList';
import { GROUP_TYPE } from './MaterialTabs/MaterialTab';
import { useAppParams } from '../../../../shared/AppRoot/context';
import { useGetNotCategoriedComponents } from './hooks/useGetNotCategoriedComponents';

export const MaterialDialog = memo(() => {
  const [tabs, setTabs] = useState<IMaterialTab[]>([]);
  const { plugins } = useAppParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const getUnCategoriedComponents = useGetNotCategoriedComponents(tabs);

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

  const getGroup = useCallback((uuid?: string) => {
    const tab = tabs.find(tab => tab.collopsesItems?.find(group => group.uuid === uuid));
    const group = tab?.collopsesItems.find(group => group.uuid === uuid);
    return group
  }, [tabs]);

  const getPlugin = useCallback((id?: string) => {
    return plugins?.find(plugin => plugin.plugin?.id === id)
  }, [plugins]);

  const groupInsertAt = useCallback((tab: IMaterialTab, group: IMaterialCollapseItem, index: number) => {
    const newGroups = tab.collopsesItems.filter(itm => itm.uuid !== group.uuid)
    newGroups.splice(index, 0, group);
    setTabs(tabs => tabs.map(tb => tb.uuid === tab.uuid ? { ...tab, collopsesItems: newGroups } : tb))
  }, [])

  const moveComponent = useCallback((sourceGroup: IMaterialCollapseItem, targetGroup: IMaterialCollapseItem, name: string, index: number) => {
    const tab = tabs.find(tab => tab.collopsesItems?.find(gp => gp.uuid === targetGroup.uuid));
    const newSourceGroup = { ...sourceGroup, components: sourceGroup?.components?.filter(com => com !== name) || [] }
    const newGroups = tab.collopsesItems.map(gp => gp.uuid === newSourceGroup.uuid ? newSourceGroup : gp);
    const tgGroup = newGroups?.find(gp => gp.uuid === targetGroup.uuid);
    if (!tgGroup) {
      console.error("Can not find target group")
      return;
    }
    const newNames = [...tgGroup.components];
    newNames.splice(index, 0, name);
    const newTargetGroup = { ...tgGroup, components: newNames };
    const newGroups2 = newGroups.map(gp => gp.uuid === newTargetGroup.uuid ? newTargetGroup : gp);
    setTabs(tabs => tabs.map(tb => tb.uuid === tab.uuid ? { ...tab, collopsesItems: newGroups2 } : tb))
  }, [tabs])

  const addComponentsToGroup = useCallback((group: IMaterialCollapseItem, names: string[], index: number) => {
    const newNames = [...group.components];
    newNames.splice(index, 0, ...names);
    const newGroup = { ...group, components: newNames };
    const tab = tabs.find(tab => tab.collopsesItems?.find(gp => gp.uuid === group.uuid));
    const newGroups = tab.collopsesItems.map(gp => gp.uuid === newGroup.uuid ? newGroup : gp);
    setTabs(tabs => tabs.map(tb => tb.uuid === tab.uuid ? { ...tab, collopsesItems: newGroups } : tb))
  }, [tabs]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;
      if (type === GROUP_TYPE) {
        const tab = tabs.find(tab => tab.collopsesItems?.find(group => group.uuid === draggableId));
        const group = tab.collopsesItems.find(group => group.uuid === draggableId)
        groupInsertAt(tab, group, destination.index);
        return;
      }
      const targetGroup = getGroup(destination?.droppableId);
      if (!targetGroup) {
        console.error("No target group");
        return;
      }

      if (source.droppableId === PLUGINS_LIST_ID) {
        const draggedPlugin = getPlugin(draggableId);
        const coms = getUnCategoriedComponents(draggedPlugin?.plugin) || [];
        addComponentsToGroup(targetGroup, coms?.map(com => com.name), destination.index);
        return;
      }

      const sourceGroup = getGroup(source.droppableId)

      if (targetGroup) {
        if (sourceGroup) {
          moveComponent(sourceGroup, targetGroup, draggableId, destination.index);
        }
        else {
          addComponentsToGroup(targetGroup, [draggableId], destination.index)
        }
      }
    },
    [addComponentsToGroup, getGroup, getPlugin, getUnCategoriedComponents, groupInsertAt, moveComponent, tabs]
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
              <div className='content-title'>
                <div className='title-text bottom-border'>{t("Materials.ComponentsForChoose")}</div>
              </div>
              <div className='plugin-content'>
                <PluginList tabs={tabs} />
              </div>
            </div>
          </div>
        </DragDropContext>
      </Modal>
    </>
  );
})