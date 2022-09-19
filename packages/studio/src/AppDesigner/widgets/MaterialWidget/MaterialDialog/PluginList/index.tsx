import { useAppParams } from "../../../../../shared/AppRoot/context";
import React from "react";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableLabel } from "../../../../common/DraggableLabel";
import { useGetPluginLocalMessage } from "../../../../../plugin-sdk/hooks/useGetPluginLocalMessage";
import { Collapse } from "antd";
import { PluginPanel } from "./PluginPanel";
const { Panel } = Collapse;

export const PLUGINS_LIST_ID = "PLUGINS_LIST_ID";
export const PluginList = memo(() => {
  const { plugins } = useAppParams();
  const { getTitle } = useGetPluginLocalMessage();

  return (
    <Droppable droppableId={PLUGINS_LIST_ID} isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef}>
          {plugins.filter(plugin => plugin.plugin).map(plugin => plugin.plugin).map((plugin, index) => {
            return (
              <Draggable key={plugin.id} draggableId={plugin.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <PluginPanel
                      plugin={plugin}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    />
                    {snapshot.isDragging && (
                      <PluginPanel
                        plugin={plugin}
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