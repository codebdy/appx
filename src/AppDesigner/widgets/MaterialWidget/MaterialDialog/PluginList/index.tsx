import { useAppParams } from "../../../../../shared/AppRoot/context";
import React from "react";
import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PluginPanel } from "./PluginPanel";
import { IMaterialTab } from "@rxdrag/appx-plugin-sdk";

export const PLUGINS_LIST_ID = "PLUGINS_LIST_ID";
export const PluginList = memo((
  props: {
    tabs: IMaterialTab[],
  }
) => {
  const { tabs } = props;
  const { normalPlugins } = useAppParams();

  return (
    <div>
      <Droppable droppableId={PLUGINS_LIST_ID} isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {normalPlugins.filter(plugin => plugin.plugin).map(plugin => plugin.plugin).map((plugin, index) => {
              return (
                <Draggable key={plugin.id} draggableId={plugin.id} index={index}>
                  {(provided, snapshot) => (
                    <>
                      <PluginPanel
                        plugin={plugin}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        index={index}
                        className={snapshot.isDragging ? "float" : undefined}
                        tabs={tabs}
                      />
                      {snapshot.isDragging && (
                        <PluginPanel
                          plugin={plugin}
                          index={index}
                          tabs={tabs}
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
    </div>
  )
})