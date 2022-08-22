import { IAppxAction } from "../../../shared/action/model"
import React from "react"
import { memo } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import DraggableLabel from "./DraggableLabel"
import { useParseLangMessage } from "../../../hooks/useParseLangMessage"

export const ACTIONS_VIEW_ID = "ACTIONS_VIEW_ID"

export const ActionsView = memo((
  props: {
    actions: IAppxAction[],
    selectedId?: string,
    onSelect: (selectedId?: string) => void,
  }
) => {
  const { actions, selectedId, onSelect } = props;

  const p = useParseLangMessage();

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
          {actions?.map((action, index) => {
            return (
              <Draggable key={action.uuid} draggableId={action.uuid} index={index}>
                {(provided, snapshot) => (
                  <DraggableLabel
                    uuid={action.uuid}
                    title={p(action.title)}
                    className={selectedId === action.uuid ? "selected" : undefined}
                    onSelect={onSelect}
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
  )
})