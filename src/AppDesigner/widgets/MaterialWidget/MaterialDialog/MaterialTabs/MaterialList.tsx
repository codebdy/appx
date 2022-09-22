import { IMaterialCollapseItem } from "@rxdrag/appx-plugin-sdk"
import React, { useCallback } from "react"
import { memo } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { DraggableLabel } from "../../../../common/DraggableLabel"
import { useGetComponentLocalTitle } from "../../../../../plugin/hooks/useGetComponentLocalTitle"
import { useGetComponent } from "../../../../../plugin/hooks/useGetComponent"
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

export const MaterialList = memo((
  props: {
    item: IMaterialCollapseItem,
    onChange: (item: IMaterialCollapseItem) => void,
  }
) => {
  const { item, onChange } = props;

  const getComponent = useGetComponent();
  const getComTitle = useGetComponentLocalTitle();
  const handleRemove = useCallback((name: string) => {
    onChange({ ...item, components: item.components?.filter(com => name !== com) })
  }, [item, onChange]);

  return (
    <Droppable droppableId={item.uuid} >
      {(provided, snapshot) => (
        <div className="materila-list"
          ref={provided.innerRef}
          style={{
            flex: 1,
            flexFlow: "column",
            backgroundColor: snapshot.isDraggingOver
              ? "rgba(0,0,0, 0.05)"
              : undefined,
          }}
        >
          {item.components?.map((item, index) => {
            return (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided, snapshot) => (
                  <>
                    <DraggableLabel
                      title={
                        <div className="label-in-tab">
                          <div className="label-text">
                            {getComTitle(getComponent(item))}
                          </div>
                          <div className="label-button">
                            <Button
                              type="text"
                              size="small"
                              shape="circle"
                              icon={<DeleteOutlined />}
                              onClick={() => handleRemove(item)}
                            />
                          </div>
                        </div>
                      }
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      float={snapshot.isDragging}
                      ref={provided.innerRef}
                    />
                    {snapshot.isDragging && (
                      <DraggableLabel
                        title={getComTitle(getComponent(item))}
                        fixed
                      />
                    )}
                  </>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
})