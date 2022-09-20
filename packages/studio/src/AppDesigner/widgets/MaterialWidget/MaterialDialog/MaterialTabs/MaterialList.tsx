import { IMaterialCollapseItem } from "../../../../../plugin-sdk/model"
import React from "react"
import { memo } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { DraggableLabel } from "../../../../common/DraggableLabel"
import { useGetComponentLocalTitle } from "../../../../../plugin-sdk/hooks/useGetComponentLocalTitle"
import { useGetComponent } from "../../../../../plugin-sdk/hooks/useGetComponent"

export const MaterialList = memo((
  props: {
    item: IMaterialCollapseItem
  }
) => {
  const { item } = props;

  const getComponent = useGetComponent();
  const getComTitle = useGetComponentLocalTitle();

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
                      title={getComTitle(getComponent(item))}
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