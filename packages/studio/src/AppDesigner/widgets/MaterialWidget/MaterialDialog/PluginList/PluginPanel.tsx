import { IMaterialTab, IPlugin } from "@appx/plugin-sdk"
import React, { useMemo } from "react"
import { Collapse, Empty } from "antd";
import { useGetPluginLocalMessage } from "../../../../../plugin/hooks/useGetPluginLocalMessage";
import cls from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableLabel } from "../../../../common/DraggableLabel";
import { useGetComponentLocalTitle } from "../../../../../plugin/hooks/useGetComponentLocalTitle";
import { useGetNotCategoriedComponents } from "../hooks/useGetNotCategoriedComponents";
const { Panel } = Collapse;

export const PluginPanel = React.forwardRef((
  props: {
    tabs: IMaterialTab[],
    plugin: IPlugin,
    index: number,
    className?: string,
  },
  ref: any,
) => {
  const { tabs, plugin, index, className, ...other } = props;
  const { getTitle } = useGetPluginLocalMessage();
  const getComTitle = useGetComponentLocalTitle();
  const getComponents = useGetNotCategoriedComponents(tabs);
  
  const components = useMemo(()=>getComponents(plugin), [getComponents, plugin]);

  return (
    <div
      className={cls("bottom-border", className, "plugin-pannel")}
      ref={ref}
      {...other}>
      <Collapse ghost bordered={false} expandIconPosition="end">
        <Panel
          key={plugin.id}
          header={
            <div className="plugin-title">{getTitle(plugin)}</div>
          }
        >
          {
            components.length
              ?
              <Droppable droppableId={plugin.id} isDropDisabled >
                {(provided, snapshot) => (
                  <div className="tabs-view"
                    ref={provided.innerRef}
                    style={{
                      flex: 1,
                      flexFlow: "column",
                      backgroundColor: snapshot.isDraggingOver
                        ? "rgba(0,0,0, 0.05)"
                        : undefined,
                    }}
                  >
                    {components?.map((item, index) => {
                      return (
                        <Draggable key={item.name} draggableId={item.name} index={index}>
                          {(provided, snapshot) => (
                            <>
                              <DraggableLabel
                                title={getComTitle(item)}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                float={snapshot.isDragging}
                                ref={provided.innerRef}
                              />
                              {snapshot.isDragging && (
                                <DraggableLabel
                                  title={getComTitle(item)}
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
              :
              <Empty />
          }
        </Panel>
      </Collapse>
    </div>
  )
})