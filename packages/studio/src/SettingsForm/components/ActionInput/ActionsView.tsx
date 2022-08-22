import React from "react"
import { memo } from "react"
import { Droppable } from "react-beautiful-dnd"

export const ACTIONS_VIEW_ID = "ACTIONS_VIEW_ID"

export const ActionsView = memo(() => {
  return (
    <Droppable droppableId={ACTIONS_VIEW_ID} >
      {(provided, snapshot) => (
        <div className="actions-view"
          ref={provided.innerRef}
          style={{
            flex: 1,
            flexFlow: "column",
            backgroundColor: snapshot.isDraggingOver
              ? "rgba(0,0,0, 0.05)"
              : undefined,
          }}
        >

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
})