import { useAppParams } from "../../../../shared/AppRoot/context";
import React from "react";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableLabel } from "../../../common/DraggableLabel";

export const PLUGINS_LIST_ID = "PLUGINS_LIST_ID";
export const PluginList = memo(() => {
  const { plugins } = useAppParams();

  return (
    <Droppable droppableId={PLUGINS_LIST_ID} isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef}>
          {plugins.filter(plugin => plugin.plugin).map(plugin => plugin.plugin).map((plugin, index) => {
            return (
              <Draggable key={plugin.id} draggableId={plugin.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <DraggableLabel
                      title={plugin.title}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      float={snapshot.isDragging}
                      ref={provided.innerRef}
                    />
                    {snapshot.isDragging && (
                      <DraggableLabel
                        title={plugin.title}
                        fixed
                      />
                    )}
                  </>
                )}
              </Draggable>
            );
          })}
          <div style={{ display: "none" }}>{provided.placeholder}</div>
        </div>
      )}

    </Droppable>
  )
})