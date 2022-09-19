import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd"
import { IMaterialCollapseItem, IMaterialTab } from "../../../../../plugin-sdk/model";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { createUuid } from "../../../../../shared";
import { GroupLabel } from "./GroupLabel";
import { Draggable, Droppable } from "react-beautiful-dnd";
import clx from "classnames";
import { MaterialList } from "./MaterialList";
const { Panel } = Collapse;

export const MaterialTab = memo((
  props: {
    tab: IMaterialTab,
    onChange: (tab: IMaterialTab) => void,
  }
) => {
  const { tab, onChange } = props;
  const { t } = useTranslation();

  const handleAdd = useCallback(() => {
    onChange({
      ...tab, collopsesItems: [...tab.collopsesItems, {
        uuid: createUuid(),
        title: "Group",
        components: [],
      }]
    })
  }, [onChange, tab])

  const handleChange = useCallback((group: IMaterialCollapseItem) => {
    onChange({ ...tab, collopsesItems: tab.collopsesItems.map(item => item.uuid === group.uuid ? group : item) })
  }, [onChange, tab])

  const handleRemove = useCallback((uuid: string) => {
    onChange({ ...tab, collopsesItems: tab.collopsesItems.filter(item => item.uuid !== uuid) })
  }, [onChange, tab])

  return (
    <div>
      <Droppable droppableId={tab.uuid}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              flex: 1,
              flexFlow: "column",
              backgroundColor: snapshot.isDraggingOver
                ? "rgba(0,0,0, 0.05)"
                : undefined,
            }}
          >
            {
              tab.collopsesItems.map((item, index) => {
                return (
                  <Draggable
                    key={item.uuid}
                    draggableId={item.uuid}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        className={clx("material-group", { float: snapshot.isDragging })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Collapse ghost bordered={false}>
                          <Panel
                            header={<GroupLabel group={item} onChange={handleChange} onRemove={handleRemove} />}
                            key={item.uuid}
                          >
                            <MaterialList item={item} />
                          </Panel>
                        </Collapse>
                      </div>
                    )}
                  </Draggable>
                )
              })
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div style={{ padding: "0 16px" }}>
        <Button
          type='dashed'
          block
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          {t("Materials.Add")}
        </Button>
      </div>
    </div>
  )
})