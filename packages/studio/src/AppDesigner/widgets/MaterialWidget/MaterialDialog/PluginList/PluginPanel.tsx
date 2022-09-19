import { IPlugin } from "../../../../../plugin-sdk/model"
import React from "react"
import { Collapse, Empty } from "antd";
import { useGetPluginLocalMessage } from "../../../../../plugin-sdk/hooks/useGetPluginLocalMessage";
import cls from "classnames";
import { useParams } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableLabel } from "../../../../common/DraggableLabel";
import { useGetComponentLocalTitle } from "../../../../../plugin-sdk/hooks/useGetComponentLocalTitle";
const { Panel } = Collapse;

export const PluginPanel = React.forwardRef((
  props: {
    plugin: IPlugin,
    index: number,
    className?: string,
  },
  ref: any,
) => {
  const { plugin, index, className, ...other } = props;
  const { device } = useParams();
  const { getTitle } = useGetPluginLocalMessage();
  const getComTitle = useGetComponentLocalTitle();
  const components = plugin.components?.[device]

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